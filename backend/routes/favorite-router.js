import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import favoriteSchema from "../schemas/favorite-schema.js";

// CONTROLLERS
import FavoriteController from "../controllers/favorite-controller.js";

const router = Router();

/**
 * @swagger
 * /user/favorites/{id_user}:
 *   get:
 *     summary: get user's favorite anasheed
 *     description: retrieves a list of favorite anasheed for the specified user.
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: the user id who's gonna retrieve favorite Anasheed.
 *     responses:
 *       200:
 *         description: Successfully retrieved favorite Anasheed
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
 *                   duration:
 *                     type: string
 *                   file_path:
 *                     type: string
 *                   created_at:
 *                     type: date
 *                     description: whene the nasheed was created
 *                   artist_name:
 *                     type: string
 *                   audio_path:
 *                     type: string
 *                   is_favorite:
 *                     type: boolean
 *       404:
 *         description: No favorite Anasheed found for the user
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
    validator(favoriteSchema.getFavoriteAnasheed, 'params'),
    AsyncHandler(FavoriteController.getFavorite)
);

/**
 * @swagger
 * /user/favorites/add:
 *   post:
 *     summary: add nasheed to user's favorites
 *     description: adds a specified nasheed to the favorites of a specific user.
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 description: user id who added the nasheed to the favorite list.
 *               id_anasheed:
 *                 type: integer
 *                 description: nasheed id.
 *     responses:
 *       200:
 *         description: Successfully added nasheed to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "This nasheed is added from favorite successfully"
 *       404:
 *         description: Failed to add nasheed to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data to display"
*/

router.post(
    "/add",
    validator(favoriteSchema.addToFavorite),
    AsyncHandler(FavoriteController.addToFavorite)
);

/**
 * @swagger
 * /user/favorites/remove:
 *   put:
 *     summary: remove nasheed from user's favorites
 *     description: removes a specified nasheed from the favorites of a specific user.
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 description: user id who's removing the nasheed from his favorite list.
 *               id_anasheed:
 *                 type: integer
 *                 description: nasheed id.
 *     responses:
 *       200:
 *         description: Successfully removed nasheed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "This nasheed is deleted from favorite successfully"
 *       404:
 *         description: Failed to remove nasheed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data to display"
*/

router.put(
    "/remove",
    validator(favoriteSchema.removeFromFavorite),
    AsyncHandler(FavoriteController.removeFromFavorite)
);

export default router;