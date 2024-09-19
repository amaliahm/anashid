import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import passport from "passport";

import { ALLOWED_ORIGINS } from "../configs/config.js";

// REPOS
import AuthRepo from "../repos/auth-repo.js";
import EmailRepo from "../repos/email-repo.js";

// DATABASE
import DataBaseRepo from "../database/index.js";
import { register_with_email } from "../database/queries/auth-queries.js";

export default class AuthController {
  static async login(req, res, next) {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
          return res.status(500).json({ message: 'Please verify your information and try again' });
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        req.logIn(user, async (err) => {
          if (err) {
            return res.status(500).json({ message: 'Please verify your information and try again' });
          }
          await AuthRepo.logUser(user.id);
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          return res.status(200).json({ message: 'Login successful', user, token });
        });
      })(req, res, next);
  }

  static async signup(req, res) {
      const data = req.body;
      const existingUser = await AuthRepo.findUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const referer = req.get('Referer') || '';
      const baseUrl = ALLOWED_ORIGINS.find(origin => referer.startsWith(origin)) || ALLOWED_ORIGINS[0];
      const verificationLink = `${baseUrl}/auth/verify-email/${data.email}`;
      await EmailRepo.sendEmail(
        data.email, 
        'Verify Your Account',
        `Please verify your account by clicking on the following link: ${verificationLink}`,
        `<p>Please verify your account by clicking on the following link: <a href="${verificationLink}">Verify Email</a></p>`
      );
      await DataBaseRepo.queryDatabase(
        register_with_email,
      [data.username, data.email, hashedPassword]
      );
      res.status(201).json({ message: 'User created successfully, please verify your email' });
  }

  static async verifyEmail (req, res) {
    const { email } = req.body
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await AuthRepo.verifyUserEmail(email)
    return res.status(200).json({ message: 'Email verified successfully' });
  }

  static async forgetPassword(req, res) {
    const { email } = req.body
    const user = await AuthRepo.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const referer = req.get('Referer') || '';
    const baseUrl = ALLOWED_ORIGINS.find(origin => referer.startsWith(origin)) || ALLOWED_ORIGINS[0];
    const verificationLink = `${baseUrl}/auth/reset-password/${email}`;
    await EmailRepo.sendEmail(
       email, 
       'Password Reset Request',
       `You are receiving this because you (or someone else) requested a password reset for your account. Please click on the following link to reset your password: ${verificationLink}`,
       `<p>You are receiving this because you (or someone else) requested a password reset for your account. Please click on the following link to reset your password: <a href="${verificationLink}">Verify Email</a></p>`
    );
  }

  static async resetPassword(req, res) {
    const { token } = req.params
    const { newPassword } = req.body
    const user = await AuthRepo.findUserByEmail(token);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await AuthRepo.changePassword(hashedPassword, token)
    return res.status(200).json({ message: 'Password reset successful' });
  }
}