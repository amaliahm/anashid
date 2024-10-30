import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import playedNowSchema from "../schemas/played-now-schema.js";

// CONTROLLERS
import PlayedNowController from "../controllers/played-now-controller.js";

const router = Router();

/**
 * @swagger
 * /user/playednow/{id_user}:
 *   get:
 *     summary: get last listening nasheed for a user
 *     description: retrieves the last nasheed that a specific user has listened to.
 *     tags: [Listening History]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved last listened nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listening_id:
 *                   type: integer
 *                   description: the id of the listening history record.   
 *                 listening_position:
 *                   type: integer
 *                   description: the position in the nasheed that was last played.
 *                 last_listening:
 *                   type: date
 *                   description: the timestamp of when the nasheed was last listened to.
 *                 id:
 *                   type: integer
 *                   description: nasheed id.
 *                 nasheed_title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 file_path:
 *                   type: string
 *                 audio_path:
 *                   type: string
 *                 artist_name:
 *                   type: string
 *                 artist_image:
 *                   type: string
 *                   description: the file path of the artist's image.
 *                 category_image:
 *                   type: string
 *                   description: the file path of the category image associated with the nasheed.
 *                 gender_value:
 *                   type: string
 *                 language_value:
 *                   type: string
 *                 theme_value:
 *                   type: string
 *                 category_name:
 *                   type: string
 *       404:
 *         description: No data to display
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data to display"
*/

router.get(
    "/:id_user",
    validator(playedNowSchema.getListening, 'params'),
    AsyncHandler(PlayedNowController.getLastListening)
);

/**
 * @swagger
 * /user/playednow/history/{id_user}:
 *   get:
 *     summary: get all listening history for a user
 *     description: retrieves the entire listening history of a specific user, grouped by date.
 *     tags: [Listening History]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: the user id to retrieve the listening history for.
 *     responses:
 *       200:
 *         description: Successfully retrieved listening history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     listening_id:
 *                       type: integer
 *                       description: the ID of the listening history record.
 *                     listening_position:
 *                       type: integer
 *                       description: the position in the nasheed that was last played.
 *                     last_listening:
 *                       type: date
 *                       description: the timestamp of when the nasheed was last listened to.
 *                     id:
 *                       type: integer
 *                       description: nasheed id
 *                     nasheed_title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     duration:
 *                       type: integer
 *                     file_path:
 *                       type: string
 *                     artist_name:
 *                       type: string
 *       404:
 *         description: No data to display
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data to display"
*/

router.get(
    "/history/:id_user",
    validator(playedNowSchema.getListening, 'params'),
    AsyncHandler(PlayedNowController.getAllListening)
);

/**
 * @swagger
 * /user/playednow/add:
 *   post:
 *     summary: add a listening record
 *     description: creates a new listening record for a specific user and nasheed, or updates the existing record if one already exists.
 *     tags: [Listening History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_anasheed:
 *                 type: integer
 *               id_user:
 *                 type: integer
 *               position:
 *                 type: integer
 *                 description: the current position (in seconds) of the nasheed when added to the history.
 *     responses:
 *       200:
 *         description: Successfully added or updated the listening record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "This nasheed saved successfully"
 *       404:
 *         description: Failed to add listening record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "failed to add listening"
*/

router.post(
    "/add",
    validator(playedNowSchema.addListening),
    AsyncHandler(PlayedNowController.addListening)
);

export default router;