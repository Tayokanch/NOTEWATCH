import express from 'express'
import { createNoteController, getNotesController, deleteNoteController, updateNoteController} from '../controller/noteController.js'
import { generalAuth } from '../middleware/auth.js';


const router = express.Router();
router.post('/create-note', generalAuth, createNoteController);
router.get('/get-notes', generalAuth, getNotesController);
router.put('/update-note', generalAuth, updateNoteController )
router.delete('/delete-note/:noteID', generalAuth, deleteNoteController);

export default router