import { pool } from "../dbConnection/dbConnection.js";

export const markUserAsVerified = async (user) => {
    try {
      const conn = await pool.getConnection();
      const query = 'UPDATE user SET is_verified = TRUE WHERE id = ?';
      await conn.query(query, [user.id]);
    } catch (error) {
      console.error('Error marking user as verified:', error);
      throw error;
    }
  };
  