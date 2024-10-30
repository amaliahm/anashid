import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import playlistSchema from "../schemas/playlist-schema.js";

// CONTROLLERS
import PlaylistController from "../controllers/playlist-controller.js";

const router = Router();

/**
 * @swagger
 * /user/playlists/{id}:
 *   get:
 *     summary: get playlists of a specific user
 *     description: retrieves all playlists belonging to the specified user by user ID.
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the user id whose playlists are to be fetched.
 *     responses:
 *       200:
 *         description: Successfully fetched playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: playlist id
 *                   name:
 *                     type: string
 *                   file_path:
 *                     type: string
 *                   created_at:
 *                     type: date
 *                   anasheed_count:
 *                     type: integer
 *                     description: the number of anasheeds in the playlist
 *       404:
 *         description: Failed to fetch playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch playlists"
*/

router.get(
    "/:id",
    validator(playlistSchema.getPlaylist, 'params'),
    AsyncHandler(PlaylistController.getPlaylists)
);

/**
 * @swagger
 * /user/playlists/add:
 *   post:
 *     summary: add a new playlist
 *     description: creates a new playlist for the specified user.
 *     tags: [Playlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: playlist's name
 *               id:
 *                 type: integer
 *                 description: user id whos creating the playlist
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: the image file for the playlist
 *     responses:
 *       200:
 *         description: Playlist added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Playlist added successfully"
 *       404:
 *         description: Error while creating the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to upload playlist image"
*/

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(PlaylistController.addPlaylist)
);

/**
 * @swagger
 * /user/playlists/nasheed/add:
 *   post:
 *     summary: add nasheed to a playlist
 *     description: adds a specified nasheed to the specified playlist.
 *     tags: [Playlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: playlist id
 *               id_nasheed:
 *                 type: integer
 *                 description: nasheed id to be added
 *     responses:
 *       200:
 *         description: Nasheed added to playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nasheed added to playlist successfully"
 *       404:
 *         description: Failed to add the nasheed to the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add the nasheed to the playlist"
*/

router.post(
    "/nasheed/add",
    validator(playlistSchema.addToPlaylist),
    AsyncHandler(PlaylistController.addToPlaylist)
);

/**
 * @swagger
 * /user/playlists/nasheed/remove/{anasheed_playlist_id}:
 *   post:
 *     summary: remove a nasheed from a playlist
 *     description: removes a specified nasheed from the specified playlist.
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: anasheed_playlist_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the id of the nasheed in the playlist to be removed
 *     responses:
 *       200:
 *         description: Nasheed removed from playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nasheed removed from playlist successfully"
 *       404:
 *         description: Failed to remove the nasheed from the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to remove the nasheed from the playlist"
*/

router.post(
    "/nasheed/remove/:anasheed_playlist_id",
    validator(playlistSchema.removeFromPlaylist, 'params'),
    AsyncHandler(PlaylistController.removeFromPlaylist)
);

/**
 * @swagger
 * /user/playlists/{id}:
 *   delete:
 *     summary: remove a playlist
 *     description: deletes a specified playlist by its id.
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the playlist id to be deleted
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Playlist deleted successfully"
 *       404:
 *         description: Failed to delete the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete the playlist"
*/

router.delete(
    "/:id",
    validator(playlistSchema.deletePlaylist, 'params'),
    AsyncHandler(PlaylistController.deletePlaylist)
);

export default router;