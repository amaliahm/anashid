import mariadb from 'mariadb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0,
});

const setupDatabase = async () => {
  let conn;
  try {
    console.log('########"')
    conn = await pool.getConnection();
    console.log('connected');
  } catch (err) {
    console.error('erroooooooooooooooor ', err);
  } finally {
    if (conn) conn.end();
  }
};

export {
  setupDatabase, pool
};
