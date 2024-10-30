import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import searchSchema from "../schemas/search-schema.js";

// CONTROLLERS
import SearchController from "../controllers/search-controller.js";

const router = Router();

/**
 * @swagger
 * /user/search:
 *   post:
 *     summary: search for anasheed
 *     description: searches for anasheed based on a query string and returns the matching results.
 *     tags: [Search/Filter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchQuery:
 *                 type: string
 *                 description: the query string used to search for anasheed.
 *     responses:
 *       200:
 *         description: Successfully found matching anasheed
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
 *                   artist_name:
 *                     type: string
 *                   file_path:
 *                     type: string
 *       404:
 *         description: Failed to find anasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to find anasheed"
*/

router.put(
    "/",
    validator(searchSchema.search),
    AsyncHandler(SearchController.searchForNasheed)
);

/**
 * @swagger
 * /user/search/filter:
 *   put:
 *     summary: filter anasheed
 *     description: filters anasheed based on gender/theme/language parameters.
 *     tags: [Search/Filter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gender:
 *                 type: integer
 *                 nullable: true
 *                 description: the id of the gender to filter by (or null).
 *               theme:
 *                 type: integer
 *                 nullable: true
 *                 description: the id of the theme to filter by (or null).
 *               language:
 *                 type: integer
 *                 nullable: true
 *                 description: the id of the language to filter by (or null).
 *     responses:
 *       200:
 *         description: Successfully filtered anasheed
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
 *                   artist_name:
 *                     type: string
 *                   file_path:
 *                     type: string
 *       404:
 *         description: Failed to find nasheed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to find nasheed"
*/

router.put(
    "/filter",
    validator(searchSchema.filter),
    AsyncHandler(SearchController.filterForNasheed)
);

export default router;