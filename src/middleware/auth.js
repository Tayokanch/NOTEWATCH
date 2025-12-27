import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const generalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required. Please log in' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedUser = jwt.verify(token, SECRET);
    req.authUser = decodedUser; 

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Access token expired or invalid' });
  }
};

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required. Please log in' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedUser = jwt.verify(token, SECRET);
    if (decodedUser.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.decodedUser = decodedUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Access token expired or invalid' });
  }
};
