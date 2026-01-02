import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {createUser, getUser} from '../db/queries/userQueries.js'
import { createLog } from '../db/queries/logsQueries.js';
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'username, email, and password are required',
      });
    }
    
    const role = email === process.env.INIT_ADMIN_EMAIL ? 'admin' : 'user';

    const passwordHash = await bcrypt.hash(password, 12);

    await createUser(username, email, passwordHash, role);

    res.status(201).json({
      message: 'User successfully created',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};


export const login = async (req, res) =>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await getUser(email);
    if (!user) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1hr' }
    );

    res.locals.user_id = user.id;

    return res.json({
      message: 'Login successful',
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

