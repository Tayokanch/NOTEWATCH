import { pool } from '../index.js'; // correct relative path to db/index.js

export const createUser = async (username, email, password, role) => {
  await pool.query(
    `INSERT INTO users (username, email, password, role)
     VALUES ($1, $2, $3, $4)`,
    [username, email, password, role]
  );
};



export const getUser = async (email) => {
  const result = await pool.query(
    'SELECT id, username, email, password, role FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0]; 
};

