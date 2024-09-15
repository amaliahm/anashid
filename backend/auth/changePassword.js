import { pool } from "../dbConnection/dbConnection.js";

export const changePassword = async ( password, id ) => {
    try {
      const conn = await pool.getConnection();
      const query = 'UPDATE user SET password = ? WHERE id = ?';
      await conn.query(query, [ password, id ]);
    } catch (error) {
      console.error('Error saving new password:', error);
      throw error;
    }
  };
  