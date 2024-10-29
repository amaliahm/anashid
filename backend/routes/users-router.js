import { Router } from "express";

// CONTROLLERS
import UsersController from "../controllers/users-controller.js";

// SCHEMA
import usersSchema from "../schemas/users-schema.js";

// MIDDLEWARES
import validator from "../middlewares/validator.js";
import AsyncHandler from "../middlewares/async-handler.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users routes
*/

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: get users details
 *     description: gets detailed information about users, including their playlists and listening history.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: admin id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: get users details successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   file_path:
 *                     type: string
 *                     description: file path for the user's profile image.
 *                   created_at:
 *                     type: date
 *                     description: whene the user joined to anasheed.
 *                   last_login:
 *                     type: date
 *                     description: the last time the user loged in to anasheed.
 *                   email:
 *                     type: string
 *                   playlist:
 *                     type: integer
 *                     description: number of playlists created by this user.
 *                     example: 3
 *                   listening_anasheed:
 *                     type: integer
 *                     description: number of anasheed the user has listened to.
 *                   
 *       404:
 *         description: Failed to fetch user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch user
*/

router.get(
    "/:id",
    validator(usersSchema.getData, 'params'),
    AsyncHandler(UsersController.getAllUsers)
);

/**
 * @swagger
 * /admin/users/{id}:
 *   post:
 *     summary: change user role
 *     description: allows an admin to change a user's role from normal user to admin or vice versa, with condition that the current admin couldn't change his role.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: admin id.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: the current admin password for authentication.
 *               userId:
 *                 type: integer
 *                 description: the user id whose role is to be changed.
 *               account_type:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: the current role of the user, this will be toggled to the other role.
 *               adminId:
 *                 type: integer
 *                 description: the current admin id whos gonna make the change.
 *     responses:
 *       200:
 *         description: the user role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User role updated successfully"
 *       401:
 *         description: Incorrect admin password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incorrect admin password"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */


router.post(
  "/:id",
  validator(usersSchema.changeUserRole),
  AsyncHandler(UsersController.changeAccountType)
);

export default router;