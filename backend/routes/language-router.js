import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import languageSchema from "../schemas/language-schema.js";

// CONTROLLERS
import LanguageController from "../controllers/language-controller.js";

const router = Router();

/**
 * @swagger
 * /{role}/language:
 *   get:
 *     summary: get all languages
 *     description: retrieves a list of all language entries from the database.
 *     tags: [Language]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the language list.
 *     responses:
 *       200:
 *         description: Successfully fetched languages
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
 *         description: Failed to fetch languages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch languages"
*/

router.get(
    "/",
    AsyncHandler(LanguageController.getAllLanguage)
);

/**
 * @swagger
 * /admin/language/add:
 *   post:
 *     summary: add a new language
 *     description: adds new language entry to the database.
 *     tags: [Language]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *                 description: the language name to be added.
 *     responses:
 *       200:
 *         description: Language added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Language added successfully"
 *       404:
 *         description: Failed to add language
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add language"
*/

router.post(
    "/add",
    validator(languageSchema.addLanguage),
    AsyncHandler(LanguageController.addLanguage)
);

/**
 * @swagger
 * /admin/language/{id}:
 *   delete:
 *     summary: delete a language
 *     description: deletes a specific language entry from the database using its id.
 *     tags: [Language]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the language id to be deleted.
 *     responses:
 *       200:
 *         description: Language deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Language deleted successfully"
 *       404:
 *         description: Failed to delete language
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete language"
*/

router.delete(
    "/:id",
    validator(languageSchema.deleteLanguage, 'params'),
    AsyncHandler(LanguageController.deleteLanguage)
);

export default router;