import express from 'express'
import { adminAuth, generalAuth } from "../middleware/auth.js";
import { getAllLogsController, getUserLogsController } from '../controller/logsController.js';

const router = express.Router()

router.get('/my-logs', generalAuth, getUserLogsController);
router.get('/request-logs', adminAuth, getAllLogsController)

export default router