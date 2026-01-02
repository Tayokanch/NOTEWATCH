import { Pool } from 'pg';
import 'dotenv/config'; 

 console.log("host:", process.env.DB_HOST)
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const initDb = async() =>{
  try{
    await pool.connect();
        console.log('PostgreSQL connected');
  }
  catch(err){
    console.error('DB connection error:', err);
    process.exit(1); // stop server if DB is down
  }

}

