import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import profileSchema from "../schemas/profile-schema.js";

// CONTROLLERS
import ProfileController from "../controllers/profile-controller.js";

const router = Router();

/**
 * @swagger
 * /{role}/profile/add/{id}:
 *   post:
 *     summary: add/update a profile photo
 *     description: uploads a profile photo for the specified user.
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user uploading his profile photo.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the user whose profile photo is being uploaded.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 description: the image file to upload as the profile photo.
 *     responses:
 *       200:
 *         description: Profile photo added/updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile photo added successfully"
 *       404:
 *         description: Failed to find user or upload photo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to find user or upload photo"
*/

router.post(
    "/add/:id",
    upload.single('photo'),
    validator(profileSchema.addPhoto, 'params'),
    AsyncHandler(ProfileController.addProfilePhoto)
);

/**
 * @swagger
 * /{role}/profile/{id}:
 *   get:
 *     summary: get user data
 *     description: fetches the profile data of the specified user by his id.
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user fetching his profile data.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the id of the user whose data is being fetched.
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: user id
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 file_path:
 *                   type: string
 *                 created_at:
 *                   type: date
 *                   description: whene the photo was uploaded
 *       404:
 *         description: Failed to fetch user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user data"
*/

router.get(
    "/:id",
    validator(profileSchema.getUser, 'params'),
    AsyncHandler(ProfileController.getUser)
);

export default router;