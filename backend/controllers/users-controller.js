import bcrypt from 'bcryptjs'; 
import UsersRepo from "../repos/users-repo.js";

export default class UsersController {

    static async getAllUsers (req, res) {
        const users = await UsersRepo.getAllUsers();
        if (!users) {
            return res.status(404).json({ error: 'Failed to fetch user' });
        }
        res.status(200).json(users);
    }

    static async changeAccountType (req, res) {
        const { password, userId, account_type, adminId } = req.body;
        const user = await UsersRepo.findUserById(adminId);
        if (!user) {
          return { success: false, message: 'User not found' };
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return res.status(401).json({ message: "Incorrect admin password" });
        }
        const account = account_type === 'user' ? 'admin' : 'user'
        await UsersRepo.updateUserAccountType(account, userId)
        return res.status(200).json({ success: true, message: "User role updated successfully" });
    }
}