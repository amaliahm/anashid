import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import artistSchema from "../schemas/artist-schema.js";

// CONTROLLERS
import ArtistController from "../controllers/artist-controller.js";

const router = Router();

/**
 * @swagger
 * /{role}/artists:
 *   get:
 *     summary: gets all artists
 *     description: fetches all artists with their details.
 *     tags: [Artist]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the artists details.
 *     responses:
 *       200:
 *         description: Successfully retrieved all artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: artist id
 *                   artist_name:
 *                     type: string
 *                   deleted_artist:
 *                     type: boolean
 *                   bio:
 *                     type: string
 *                   file_path:
 *                     type: string
 *                   created_at:
 *                     type: date
 *                   anasheed:
 *                     type: integer
 *                     description: number of anasheed this artist has
 *       404:
 *         description: Failed to fetch artists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch artists"
*/

router.get(
    "/",
    AsyncHandler(ArtistController.getAllArtists)
);

/**
 * @swagger
 * /admin/artists/add:
 *   post:
 *     summary: add new artist
 *     description: adds a new artist with his profile image.
 *     tags: [Artist]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               photo:
 *                 type: string
 *                 description: profile image file for the artist
 *     responses:
 *       200:
 *         description: Artist added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artist added successfully"
 *       404:
 *         description: Error in adding the artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add artist"
*/

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(ArtistController.addArtist)
);

/**
 * @swagger
 * /admin/artists/{id}:
 *   put:
 *     summary: update artist details
 *     description: updates the name/bio of an existing artist.
 *     tags: [Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: artist id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artist updated successfully"
 *       404:
 *         description: Failed to update artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update artist"
*/

router.put(
    "/:id",
    validator(artistSchema.updateArtist),
    AsyncHandler(ArtistController.updateArtist)
);

/**
 * @swagger
 * /admin/artists/{id}:
 *   delete:
 *     summary: mark artist as deleted
 *     description: sets the is_deleted flag to true for the specified artist.
 *     tags: [Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: artist id
 *     responses:
 *       200:
 *         description: artist marked as deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artist deleted successfully"
 *       404:
 *         description: Failed to delete artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete artist"
*/

router.delete(
    "/:id",
    validator(artistSchema.deleteArtist, 'params'),
    AsyncHandler(ArtistController.deleteArtist)
);

/**
 * @swagger
 * /admin/artists/trash:
 *   get:
 *     summary: retrieve list of deleted artists
 *     description: fetches a list of artists marked as deleted.
 *     tags: [Artist]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of deleted artists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: artist id
 *                   artist_name:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   deleted_artist:
 *                     type: boolean
 *                   file_path:
 *                     type: string
 *                   created_at:
 *                     type: date
 *       404:
 *         description: No deleted artists found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch artists"
*/

router.get(
    "/trash",
    AsyncHandler(ArtistController.trashArtist)
);

/**
 * @swagger
 * /admin/artists/delete/{id}:
 *   delete:
 *     summary: permanently delete artist.
 *     description: permanently delete the specified artist from the database.
 *     tags: [Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: artist id to be deleted
 *     responses:
 *       200:
 *         description: Artist permanently deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artist deleted successfully"
 *       404:
 *         description: Failed to delete artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete artist"
*/

router.delete(
    "/delete/:id",
    validator(artistSchema.deleteArtist, 'params'),
    AsyncHandler(ArtistController.confirmDeleteArtist)
);

/**
 * @swagger
 * /admin/artists/restore/{id}:
 *   delete:
 *     summary: restore an archived artist
 *     description: sets the `is_deleted` flag to false, restoring the specified artist.
 *     tags: [Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: artist id to be restored.
 *     responses:
 *       200:
 *         description: Artist restored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artist restored successfully"
 *       404:
 *         description: Failed to restore artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to restore artist"
*/

router.delete(
    "/restore/:id",
    validator(artistSchema.deleteArtist, 'params'),
    AsyncHandler(ArtistController.restoreArtist)
);

export default router;