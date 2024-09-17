import { findUserById } from "./findUserById.js";
import bcrypt from 'bcryptjs'; 
import { pool } from "../dbConnection/dbConnection.js";

const updateUserAccountType = async (password, userId, account_type, id) => {
  const user = await findUserById(id); 
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { success: false, message: 'Incorrect password' };
    }
    const account = account_type === 'user' ? 'admin' : 'user'
    try {
      const query = 'update user set account_type = ? where id = ?;';
      const conn = await pool.getConnection();
      await conn.query(query, [account, userId])
      return { success: true };
    } catch (error) {
      throw error;
    }
};

export default updateUserAccountType