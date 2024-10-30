import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import anasheedSchema from "../schemas/anasheed-schema.js";

// CONTROLLERS
import AnasheedController from "../controllers/anasheed-controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Anasheed
 *   description: Anasheed routes
*/

/**
 * @swagger
 * /{role}/anasheed:
 *   get:
 *     summary: gets all anasheed
 *     description: fetches a list of all anasheed with associated details.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the anasheed data.
 *     responses:
 *       200:
 *         description: Successfully retrieved aanasheed list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nasheed_title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deleted_anasheed:
 *                     type: boolean
 *                   duration:
 *                     type: integer
 *                   file_path:
 *                     type: string
 *                     description: file path for the anasheed image.
 *                   created_at:
 *                     type: date
 *                     description: when the anasheed was created.
 *                   artist_name:
 *                     type: string
 *                     description: name of the artist associated with this nasheed.
 *                   audio_path:
 *                     type: string
 *                     description: file path for the nasheed audio.
 *                   category_name:
 *                     type: string
 *                   language_value:
 *                     type: string
 *                   theme_value:
 *                     type: string
 *                   gender_value:
 *                     type: string
 *                   listening_anasheed:
 *                     type: integer
 *                     description: number of times this anasheed has been listened to.
 *                   favorite_anasheed:
 *                     type: integer
 *                     description: number of times this anasheed has been marked as a favorite.
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
    "/",
    AsyncHandler(AnasheedController.getAllAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/{id}:
 *   get:
 *     summary: gets all anasheed with favorite status for a specific user
 *     description: fetches a list of all anasheed with associated details including favorite status.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the anasheed data.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: id
 *         description: user id
 *     responses:
 *       200:
 *         description: Successfully retrieved aanasheed list with favorite status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nasheed_title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deleted_anasheed:
 *                     type: boolean
 *                   duration:
 *                     type: integer
 *                   file_path:
 *                     type: string
 *                     description: file path for the anasheed image.
 *                   created_at:
 *                     type: date
 *                     description: when the anasheed was created.
 *                   artist_name:
 *                     type: string
 *                     description: name of the artist associated with this nasheed.
 *                   audio_path:
 *                     type: string
 *                     description: file path for the nasheed audio.
 *                   category_name:
 *                     type: string
 *                   language_value:
 *                     type: string
 *                   theme_value:
 *                     type: string
 *                   gender_value:
 *                     type: string
 *                   is_favorite:
 *                     type: boolean
 *                   user_id:
 *                     type: integer
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
    "/:id",
    validator(anasheedSchema.favoriteAnasheed, 'params'),
    AsyncHandler(AnasheedController.getAllAnasheedWithFavorite)
);

/**
 * @swagger
 * /{role}/anasheed/{artist_or_category}/{id}/{user}:
 *   get:
 *     summary: gets anasheed by category/artist with users's favorite status
 *     description: fetches a list of anasheed in a specific category/artist with associated details including favorite status.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the anasheed data.
 *       - in: path
 *         name: artist_or_category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [artist, category]
 *         description: the anasheed list will be for specific artist/category.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: category/artist id
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: integer
 *         description: user id
 *     responses:
 *       200:
 *         description: Successfully retrieved anasheed list for the category/artist with favorite status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: nasheed id.
 *                   nasheed_title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deleted_anasheed:
 *                     type: boolean
 *                   duration:
 *                     type: integer
 *                   file_path:
 *                     type: string
 *                     description: file path for the anasheed image.
 *                   created_at:
 *                     type: date
 *                     description: when the anasheed was created.
 *                   artist_name:
 *                     type: string
 *                     description: name of the artist associated with this nasheed.
 *                   audio_path:
 *                     type: string
 *                     description: file path for the nasheed audio.
 *                   category_name:
 *                     type: string
 *                   language_value:
 *                     type: string
 *                   theme_value:
 *                     type: string
 *                   gender_value:
 *                     type: string
 *                   is_favorite:
 *                     type: boolean
 *                   user_id:
 *                     type: integer
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
    "/category/:id/:user",
    validator(anasheedSchema.getCategoryAnasheed, 'params'),
    AsyncHandler(AnasheedController.getCategoryAnasheed)
);

router.get(
    "/artist/:id/:user",
    validator(anasheedSchema.getArtistAnasheed, 'params'),
    AsyncHandler(AnasheedController.getArtistAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/playlist/{id}/{id_playlist}:
 *   get:
 *     summary: gets anasheed by playlist with users's favorite status
 *     description: fetches a list of anasheed in a specific playlist with associated details including favorite status.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the anasheed data.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: user id
 *       - in: path
 *         name: id_playlist
 *         required: true
 *         schema:
 *           type: integer
 *         description: playlist id
 *     responses:
 *       200:
 *         description: Successfully retrieved anasheed list for the playlist with favorite status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: user id
 *                   id_playlist:
 *                     type: integer
 *                     description: playlist id
 *                   name:
 *                     type: string
 *                     description: playlist name
 *                   nasheed_title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deleted_anasheed:
 *                     type: boolean
 *                   anasheed_playlist_id:
 *                     type: integer
 *                     description: the id of element in anasheedPlaylist table.
 *                   duration:
 *                     type: integer
 *                   file_path:
 *                     type: string
 *                     description: file path for the anasheed image.
 *                   created_at:
 *                     type: date
 *                     description: when the anasheed was created.
 *                   artist_name:
 *                     type: string
 *                     description: name of the artist associated with this nasheed.
 *                   audio_path:
 *                     type: string
 *                     description: file path for the nasheed audio.
 *                   is_favorite:
 *                     type: boolean
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
    "/playlist/:id/:id_playlist",
    validator(anasheedSchema.getPlaylistAnasheed, 'params'),
    AsyncHandler(AnasheedController.getPlaylistAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/anasheed/new:
 *   get:
 *     summary: get new anasheed
 *     description: fetches the 5 most recently added anasheed.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting 5 latest added anasheed.
 *     responses:
 *       200:
 *         description: Successfully retrieved new anasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: nasheed id
 *                   nasheed_title:
 *                     type: string
 *                   file_path:
 *                     type: string
 *                   artist_name:
 *                     type: string
 *       404:
 *         description: Error while fetching data
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
    "/anasheed/new",
    AsyncHandler(AnasheedController.getNewAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/anasheed/trending:
 *   get:
 *     summary: get trending anasheed
 *     description: fetches the top 5 trending anasheed based on listening duration.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting to top 5 trending anasheed.
 *     responses:
 *       200:
 *         description: Successfully retrieved trending anasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: nasheed id
 *                   nasheed_title:
 *                     type: string
 *                   duration:
 *                     type: number
 *                   release_date:
 *                     type: date
 *                     description: whene the anasheed was added.
 *                   file_path:
 *                     type: string
 *                   artist_name:
 *                     type: string
 *                   category_name:
 *                     type: string
 *                   listening_duration:
 *                     type: number
 *       404:
 *         description: Error while fetching data
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
    "/anasheed/trending",
    AsyncHandler(AnasheedController.getTrendingAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/add:
 *   post:
 *     summary: add a new nasheed
 *     description: uploads a new nasheed with its details and associated files (image and audio).
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting to insert nasheed.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *                 description: nasheed duration in seconds.
 *               id_artist:
 *                 type: integer
 *               id_language:
 *                 type: integer
 *               id_theme:
 *                 type: integer
 *               id_gender:
 *                 type: integer
 *               id_category:
 *                 type: integer
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: the nasheed image.
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: the audio file for the new nasheed.
 *     responses:
 *       200:
 *         description: Successfully added the nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nasheed added successfully"
 *       404:
 *         description: Failed to add the nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add this nasheed"
 *       500:
 *         description: Failed to upload nasheed audio/image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to upload the nasheed image/audio S3"
*/

router.post(
    "/add",
    upload.fields([
        { name: 'photo', maxCount: 1 }, 
        { name: 'audio', maxCount: 1 }
    ]),
    validator(anasheedSchema.addAnasheed),
    AsyncHandler(AnasheedController.addAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/update:
 *   put:
 *     summary: update a nasheed's title and description
 *     description: updates the title and description for the specified nasheed id.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the nasheed to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: nasheed id to update.
 *               title:
 *                 type: string
 *                 description: the new title of the nasheed.
 *               description:
 *                 type: string
 *                 description: the new description of the nasheed.
 *     responses:
 *       200:
 *         description: Successfully updated the nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nasheed updated successfully"
 *       404:
 *         description: Failed to update this nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update this nasheed"
*/

router.put(
    "/update",
    validator(anasheedSchema.updateAnasheed),
    AsyncHandler(AnasheedController.updateAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/{id}:
 *   delete:
 *     summary: Mark an nasheed as deleted
 *     description: Sets the is_deleted attribute to true for the specified nasheed ID, effectively archiving it.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the nasheed to retrieve archived anasheed.
 *       - name: id
 *         in: path
 *         required: true
 *         description: nasheed id to be marked as deleted.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully marked the nasheed as deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nasheed deleted successfully"
 *       404:
 *         description: Nasheed not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete this nasheed"
*/

router.delete(
    "/:id",
    validator(anasheedSchema.deleteAnasheed, 'params'),
    AsyncHandler(AnasheedController.deleteAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/trash:
 *   get:
 *     summary: retrieve archived anasheed
 *     description: fetches a list of all anasheed that have been archived (marked as deleted).
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the nasheed to retrieve archived anasheed.
 *     responses:
 *       200:
 *         description: Successfully retrieved archived anasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: nasheed id
 *                   nasheed_title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deleted_anasheed:
 *                     type: boolean
 *                     example: true
 *                   created_at:
 *                     type: string
 *                     format: date
 *                     description: where the nasheed was created.
 *                   artist_name:
 *                     type: string
 *                   file_path:
 *                     type: string
 *                     description: file path for the anasheed image.
 *       404:
 *         description: Failed to fetch anasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch anasheed"
*/

router.get(
    "/trash",
    AsyncHandler(AnasheedController.trashAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/delete/{id}:
 *   delete:
 *     summary: confirm deletion of a nasheed
 *     description: permanently deletes the nasheed from the database after confirming the deletion and deleting its associated data (image and audio).
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the nasheed to be restored.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: nasheed id to be permanently deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Anasheed deleted successfully"
 *       404:
 *         description: Failed to delete the nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete this nasheed"
*/

router.delete(
    "/delete/:id",
    validator(anasheedSchema.deleteAnasheed, 'params'),
    AsyncHandler(AnasheedController.confirmDeleteAnasheed)
);

/**
 * @swagger
 * /{role}/anasheed/restore/{id}:
 *   delete:
 *     summary: restore a soft-deleted nasheed
 *     description: restores nasheed that was previously archived by setting its `is_deleted` attribute back to `false`.
 *     tags: [Anasheed]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the nasheed to be restored.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: nasheed id to restore
 *     responses:
 *       200:
 *         description: Successfully restored the nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Anasheed restored successfully"
 *       404:
 *         description: Failed to restore anasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to restore anasheed"
*/

router.delete(
    "/restore/:id",
    validator(anasheedSchema.deleteAnasheed, 'params'),
    AsyncHandler(AnasheedController.restoreAnasheed)
);

export default router;