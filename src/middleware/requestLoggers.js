import { createLog } from "../db/queries/logsQueries.js";


export const requestLogger = (req, res, next) => {
  console.log("This is userID", res.locals.user_id )
  res.on('finish', () => {
    createLog({
      user_id: res.locals.user_id || req.user?.id,
      endpoint: req.originalUrl,
      method: req.method,
      user_agent: req.headers['user-agent'],
      ip_address: req.ip || req.socket.remoteAddress,
      status_code: res.statusCode
    });
  });

  next();
};