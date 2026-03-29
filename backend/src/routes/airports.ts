import express from 'express';
import { AirportController } from '../controllers/AirportController';
const router = express.Router();
const ctrl = new AirportController();
router.get('/', ctrl.getAll);
router.get('/nearest', ctrl.getNearest);
router.get('/:id', ctrl.getById);
export default router;
