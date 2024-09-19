import DataBaseRepo from "../database/index.js"
import { _getAllUsers, _updateUserAcountType } from "../database/queries/users-queries.js"
import { _findUserById } from "../database/queries/auth-queries.js"


export default class UsersRepo {

    static async getAllUsers() {
        const users = await DataBaseRepo.queryDatabase(_getAllUsers, [])
        return (users === null || users.length > 0) ? users : null
    }

    static async findUserById(adminId) {
        const user = await DataBaseRepo.queryDatabase(_findUserById, [adminId])
        return (user === null || user.length > 0) ? user[0] : null
    }

    static async updateUserAccountType(account_type, userId) {
        await DataBaseRepo.queryDatabase(_updateUserAcountType, [account_type, userId])
    }
}