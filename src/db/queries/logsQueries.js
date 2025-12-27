import {pool} from '../index.js'

export const createLog = async({user_id,endpoint, method, user_agent, ip_address, status_code})=>{

await pool.query(
  `INSERT INTO request_logs
   (user_id, endpoint, method, user_agent, ip_address, status_code)
   VALUES ($1, $2, $3, $4, $5, $6)`,
  [
    user_id,
    endpoint,
    method,
    user_agent,
    ip_address,
    status_code
  ]
);

}


export const getAllLogsQuery = async () => {
  const result = await pool.query(
    `SELECT *
     FROM request_logs
     ORDER BY created_at DESC`
  );

  return result.rows;
};

export const getUserLogsQuery = async (user_id) => {
  const result = await pool.query(
    `SELECT *
     FROM request_logs
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [user_id]
  );

  return result.rows;
};
