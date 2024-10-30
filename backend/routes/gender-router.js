import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import genderSchema from "../schemas/gender-schema.js";

// CONTROLLERS
import GenderController from "../controllers/gender-controller.js";

const router = Router();

/**
 * @swagger
 * /{role}/gender:
 *   get:
 *     summary: get all genders
 *     description: retrieves a list of all gender entries from the database.
 *     tags: [Gender]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the gender list.
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
 *         description: Failed to fetch genders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch genders"
*/

router.get(
    "/",
    AsyncHandler(GenderController.getAllGender)
);

/**
 * @swagger
 * /admin/gender/add:
 *   post:
 *     summary: add a new gender
 *     description: adds new gender entry to the database.
 *     tags: [Gender]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *                 description: the gender name to be added.
 *     responses:
 *       200:
 *         description: Gender added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gender added successfully"
 *       404:
 *         description: Failed to add gender
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add gender"
*/

router.post(
    "/add",
    validator(genderSchema.addGender),
    AsyncHandler(GenderController.addGender)
);

/**
 * @swagger
 * /admin/gender/{id}:
 *   delete:
 *     summary: delete a gender
 *     description: deletes a specific gender entry from the database using its id.
 *     tags: [Gender]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the gender id to be deleted.
 *     responses:
 *       200:
 *         description: Gender deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gender deleted successfully"
 *       404:
 *         description: Failed to delete gender
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete gender"
*/

router.delete(
    "/:id",
    validator(genderSchema.deleteGender, 'params'),
    AsyncHandler(GenderController.deleteGender)
);

export default router;