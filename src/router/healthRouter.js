import express from 'express';

import { healthCheckController } from '../health/healthCheckController.js';

const router = express.Router()

router.get('/health', healthCheckController);

export default router