import express from 'express';
import { DishController } from '../controllers/DishController';
const router = express.Router();
const ctrl = new DishController();
router.get('/popular', ctrl.getPopular);
export default router;
