import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import publicitySchema from "../schemas/publicity-schema.js";

// CONTROLLERS
import PublicityController from "../controllers/publicity-controller.js";

const router = Router();

/**
 * @swagger
 * /{role}/publicity:
 *   get:
 *     summary: get all publicities data
 *     description: fetches all publicities records.
 *     tags: [Publicity]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user fetching the publicity data.
 *     responses:
 *       200:
 *         description: Publicity data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: publicity id
 *                   file_path:
 *                     type: string
 *                   created_at:
 *                     type: date
 *                     description: the date whene the publicity was added
 *       404:
 *         description: Failed to fetch publicity data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch publicities"
*/

router.get(
    "/",
    AsyncHandler(PublicityController.getAllPublicity)
);

/**
 * @swagger
 * /admin/publicity/add:
 *   post:
 *     summary: add new publicity entry
 *     description: uploads a publicity image.
 *     tags: [Publicity]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 description: the image file to upload for publicity.
 *     responses:
 *       200:
 *         description: Publicity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Publicity added successfully"
 *       404:
 *         description: Failed to add publicity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add publicity"
*/

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(PublicityController.addPublicity)
);

/**
 * @swagger
 * /admin/publicity/{id}:
 *   delete:
 *     summary: delete publicity entry
 *     description: deletes a publicity entry from the database along with its associated file.
 *     tags: [Publicity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the publicity id entry to delete.
 *     responses:
 *       200:
 *         description: Publicity deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Publicity deleted successfully"
 *       404:
 *         description: Failed to delete publicity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete publicity"
*/

router.delete(
    "/:id",
    validator(publicitySchema.deletePublicity, 'params'),
    AsyncHandler(PublicityController.deletePublicity)
);

export default router;