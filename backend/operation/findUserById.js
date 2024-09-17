import { pool } from '../dbConnection/dbConnection.js'; 

export const findUserById = async (id) => {
  try {
    const query = 'SELECT * FROM user WHERE id = ?;';
    const conn = await pool.getConnection();
    const [rows] = await conn.query(query, [id])
    if (Object.keys(rows).length > 0) {
      return rows; 
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding user by id:', error);
    throw error;
  }
};
