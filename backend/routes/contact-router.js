import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import sendEmailSchema from "../schemas/sendEmail-schema.js";

// CONTROLLERS
import SendEmailController from "../controllers/sendEmail-controller.js";

const router = Router();

/**
 * @swagger
 * /user/sendEmail/{id}:
 *   post:
 *     summary: send email to admin
 *     description: Sends email admin from user.
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the user id to get his email inorder to contact the admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Emails sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Emails have been sent successfully"
 *       404:
 *         description: Failed to fetch emails
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch emails"
*/

router.post(
    "/:id",
    validator(sendEmailSchema.sendEmail, 'params'),
    validator(sendEmailSchema.emailContent),
    AsyncHandler(SendEmailController.contactEmail)
);

export default router;