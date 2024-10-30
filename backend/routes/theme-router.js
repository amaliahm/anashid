import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import themeSchema from "../schemas/theme-schema.js";

// CONTROLLERS
import ThemeController from "../controllers/theme-controller.js";

const router = Router();

/**
 * @swagger
 * /{role}/theme:
 *   get:
 *     summary: get all themes
 *     description: retrieves a list of all theme entries from the database.
 *     tags: [Theme]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the theme list.
 *     responses:
 *       200:
 *         description: Successfully fetched genders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   value:
 *                     type: string
 *       404:
 *         description: Failed to fetch themes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch themes"
*/

router.get(
    "/",
    AsyncHandler(ThemeController.getAllTheme)
);

/**
 * @swagger
 * /admin/theme/add:
 *   post:
 *     summary: add a new theme
 *     description: adds new theme entry to the database.
 *     tags: [Theme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *                 description: the theme name to be added.
 *     responses:
 *       200:
 *         description: Theme added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "theme added successfully"
 *       404:
 *         description: Failed to add theme
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add theme"
*/

router.post(
    "/add",
    validator(themeSchema.addTheme),
    AsyncHandler(ThemeController.addTheme)
);

/**
 * @swagger
 * /admin/theme/{id}:
 *   delete:
 *     summary: delete a theme
 *     description: deletes a specific theme entry from the database using its id.
 *     tags: [Theme]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the theme id to be deleted.
 *     responses:
 *       200:
 *         description: Theme deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Theme deleted successfully"
 *       404:
 *         description: Failed to delete theme
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete theme"
*/

router.delete(
    "/:id",
    validator(themeSchema.deleteTheme, 'params'),
    AsyncHandler(ThemeController.deleteTheme)
);

export default router;