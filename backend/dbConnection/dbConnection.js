import mariadb from 'mariadb';
import config from 'config'

const dbConfig = config.get('db');

const pool = mariadb.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
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

export default setupDatabase;
