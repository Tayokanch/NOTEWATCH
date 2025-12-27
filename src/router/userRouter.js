import express from 'express';
import { signUp, login } from '../controller/userController.js';

const router = express.Router();
router.post('/user/signup', signUp);
router.post('/user/login', login )

export default router