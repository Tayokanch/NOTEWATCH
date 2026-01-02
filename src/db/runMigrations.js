import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,  // must be "db" inside Docker
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const runMigrations = async () => {
  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('Connected to Postgres!');

    // Path to migrations
    const migrationsDir = path.resolve('/app/src/db/migrations'); 
    // Adjust this path depending on your container WORKDIR

    if (!fs.existsSync(migrationsDir)) {
      throw new Error(`Migrations folder not found: ${migrationsDir}`);
    }

    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await pool.query(sql);
      console.log(`Ran migration: ${file}`);
    }

    console.log('All migrations completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runMigrations();
