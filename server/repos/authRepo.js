import DataBaseRepo from "../database/index.js";

export default class AuthRepo {
  static async changePassword(password, id) {
    try {
      const conn = await pool.getConnection();
      const query = "UPDATE user SET password = ? WHERE id = ?";
      await conn.query(query, [password, id]);
    } catch (error) {
      console.error("Error saving new password:", error);
      throw error;
    }
  }
}
