import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

const pool = new Pool()

export const migrationsDir = path.resolve('src/db/migrations')

for (const file of fs.readdirSync(migrationsDir)) {
  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
  await pool.query(sql)
  console.log(`Ran migration: ${file}`)
}

process.exit(0)
