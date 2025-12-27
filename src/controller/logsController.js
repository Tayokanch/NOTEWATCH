import { getAllLogsQuery, getUserLogsQuery } from "../db/queries/logsQueries.js";


export const getUserLogsController = async (req, res) => {
  try {

    const userId = req.authUser.id;
    
    if (!userId) throw new Error('User not found');

    const logs = await getUserLogsQuery(userId);

    res.status(200).json({ logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get logs' });
  }
};


export const getAllLogsController = async (req, res) => {
  try {

    const logs = await getAllLogsQuery();
    res.status(200).json({ logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get logs' });
  }
};

