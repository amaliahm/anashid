import { pool } from '../dbConnection/dbConnection.js'; 

export const findUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM user WHERE email = ?;';
    const conn = await pool.getConnection();
    const [rows] = await conn.query(query, [email])
    if (Object.keys(rows).length > 0) {
      return rows; 
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};
