import DataBaseRepo from "../database/index.js";
import { 
  updateUserPassword, 
  userLogin,
   _findUserByEmail, 
   register_with_email, 
   _verifyUserEmail, 
   _findUserById,
   _userLogout
} from '../database/queries/auth-queries.js'

export default class AuthRepo {

    /**
     * logs user in by updating the user's login status in the database.
     *
     * @param {number} id - user id.
     * @returns {Promise<void>} - resolves when the user has been logged in.
    */

    static async logUser (id) {
      await DataBaseRepo.queryDatabase(userLogin, [id])
    }

    static async findUserByEmail(email) {
      const rows = await DataBaseRepo.queryDatabase(_findUserByEmail, [email])
      return (rows !== null) ? rows : null
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

  static async findUserById(id) {
    const rows = await DataBaseRepo.queryDatabase(_findUserById, [id])
    return (rows !== null) ? rows : null
  }

  static async userLogout(id) {
    await DataBaseRepo.queryDatabase(_userLogout, [id])
  }

}