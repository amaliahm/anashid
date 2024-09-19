import AuthRepo from "../repos/authRepo.js";

export default class AuthController {
  static async login(req, res) {
    AuthRepo.changePassword()

    // edit 
    res.json({ id: "025", username: "floidus", emai: "example@email.xyz" });
  }
}
