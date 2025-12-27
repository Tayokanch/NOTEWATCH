import {pool} from '../index.js'

export const createNoteQuery = async (user_id, title, status)=>{
    await pool.query(
        `INSERT INTO notes (user_id, title, status)
         VALUES ($1, $2, $3)`,
        [user_id, title, status || 'pending']
    )
}

export const getUserNotesQuery = async (user_id)=>{
    const notes = await pool.query(
        `SELECT id, title, created_at, updated_at FROM notes WHERE user_id = $1`,
        [user_id]
    )
    return notes.rows;

}

export const updateNote = async (noteID, title) => {
  const query = `
    UPDATE notes
    SET title = $1,
        updated_at = NOW()
    WHERE id = $2 
    RETURNING *
  `;

  const values = [title, noteID];

  const result = await pool.query(query, values);
  return result.rows[0];
};



export const deleteNote = async (noteID) => {
  const result = await pool.query(
    'DELETE FROM notes WHERE id = $1 RETURNING *',
    [noteID]
  );

  return result.rows[0];
};
