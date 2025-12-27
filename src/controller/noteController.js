import { createNoteQuery, getUserNotesQuery, deleteNote, updateNote } from "../db/queries/noteQueries.js";

export const createNoteController = async (req, res) => {
    try {
        const userId = req.authUser.id;
        const { title, status } = req.body;

        if (!userId) throw new Error('User ID not found');
        if (!title) return res.status(400).json({ error: 'Note title is missing' });

        const note = await createNoteQuery(userId, title, status);

        res.status(201).json({
            message: 'Note successfully created',
            note
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create note' });
    }
};

export const getNotesController = async (req, res) => {
    try {
        const userId = req.authUser?.id;
        if (!userId) throw new Error('User ID not found');

        const notes = await getUserNotesQuery(userId);

        res.status(200).json({
            notes
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};

export const updateNoteController = async (req, res) => {
  try {
    const { noteID, title } = req.body;

    if (!noteID || !title) {
      return res.status(400).json({
        error: 'noteID and title are required'
      });
    }

    const updatedNote = await updateNote(noteID, title);

    if (!updatedNote) {
      return res.status(404).json({
        error: 'Note not found'
      });
    }

    return res.status(200).json({
      message: `Note with id ${noteID} has been successfully updated`,
      note: updatedNote
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNoteController = async (req, res) => {
  try {
    const { noteID } = req.params;
    console.log("This is noteID:", noteID);

    const id = parseInt(noteID, 10);

    const deletedNote = await deleteNote(id);

    if (!deletedNote) {
      return res.status(404).json({
        error: 'Note not found'
      });
    }

    return res.status(200).json({
      message: `Note with id ${id} has been successfully deleted`
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete note' });
  }
};
