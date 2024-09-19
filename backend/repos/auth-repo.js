import DataBaseRepo from "../database/index.js";
import { updateUserPassword, userLogin, _findUserByEmail, register_with_email, _verifyUserEmail } from '../database/queries/auth-queries.js'

export default class AuthRepo {
    static async logUser (id) {
        await DataBaseRepo.queryDatabase(userLogin, [id])
    }

    static async findUserByEmail(email) {
      const rows = await DataBaseRepo.queryDatabase(_findUserByEmail, [email])
      return (rows === null || rows.length > 0) ? rows : null
    }

    static async registerUser(username, email, hashedPassword) {
        await DataBaseRepo.queryDatabase(register_with_email, [username, email, hashedPassword]);
    }

    static async verifyUserEmail(email) {
      await DataBaseRepo.queryDatabase(_verifyUserEmail, [email])
    }
    
    static async changePassword(password, email) {
      await DataBaseRepo.queryDatabase(updateUserPassword, [password, email])
  }
}