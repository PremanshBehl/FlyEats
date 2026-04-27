import { BaseService } from './BaseService';
import { UserRepository } from '../repositories/UserRepository';
import { RegisterDto, LoginDto } from '../interfaces/auth.interface';
import { hashPassword, verifyPassword } from '../lib/auth';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../lib/jwt';

export class AuthService extends BaseService {
  private userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async register(data: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await hashPassword(data.password);
    const user = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name || null,
      phone: data.phone || null,
    });

    return {
      user: { id: user.id, email: user.email, name: user.name, phone: user.phone },
      accessToken: generateAccessToken(user.id, user.email),
      refreshToken: generateRefreshToken(user.id, user.email),
    };
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user || !(await verifyPassword(data.password, user.password))) throw new Error('Invalid credentials');

    return {
      user: { id: user.id, email: user.email, name: user.name, phone: user.phone },
      accessToken: generateAccessToken(user.id, user.email),
      refreshToken: generateRefreshToken(user.id, user.email),
    };
  }

  async refresh(refreshToken: string) {
    const decoded = verifyToken(refreshToken);
    const user = await this.userRepository.findById(decoded.userId);
    if (!user) throw new Error('User not found');
    return { accessToken: generateAccessToken(user.id, user.email) };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return { user: { id: user.id, email: user.email, name: user.name, phone: user.phone } };
  }
}
