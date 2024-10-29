import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import authSchema from "../schemas/auth-schema.js";

// CONTROLLERS
import AuthController from "../controllers/auth-controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
*/

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: user/admin login
 *     description: authenticates user/admin with email and password, returns token if successful
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     last_login:
 *                       type: date
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: unauthorized - Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please verify your information and try again
 */

router.post(
  "/login",
  validator(authSchema.login, 'body'),
  AsyncHandler(AuthController.login)
);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: register user/admin
 *     description: register new user with the provided email, username and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: unique email
 *               username:
 *                 type: string
 *                 description: unique username
 *               password:
 *                 type: string
 *                 description: user account password with more than 8 characters.
 *     responses:
 *       201:
 *         description: user created successefully and verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully, please verify your email
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
*/

router.post(
  "/signup",
  validator(authSchema.signup),
  AsyncHandler(AuthController.signup)
);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: verify user/admin email
 *     description: verifies user/admin email address to activate the account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email address to verify
 *     responses:
 *       200:
 *         description: email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
*/

router.post(
  "/verify-email",
  validator(authSchema.verifyEmail),
  AsyncHandler(AuthController.verifyEmail)
);

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: reset password request
 *     description: sends a password reset link to user/admin email address.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email address where to send the reset password link.
 *     responses:
 *       200:
 *         description: password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
*/

router.post(
  "/forget-password",
  validator(authSchema.forgetPassword),
  AsyncHandler(AuthController.forgetPassword)
);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: reset user/admin account password
 *     description: updates the user password.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: the user/admin email.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: new password for the user/admin account.
 *     responses:
 *       200:
 *         description: password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successful
 *       404:
 *         description: user not found or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
*/

router.post(
  "/reset-password/:token",
  validator(authSchema.resetPassword),
  AsyncHandler(AuthController.resetPassword)
);

/**
 * @swagger
 * /auth/logout/{id}:
 *   get:
 *     summary: logout the user/admin
 *     description: logs out the user/admin and invalidates their session.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user/admin id to be logged out.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */

router.get(
  "/logout/:id",
  validator(authSchema.logout, 'params'),
  AsyncHandler(AuthController.logout)
);


export default router;