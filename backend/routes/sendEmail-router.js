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
 * /admin/sendEmail/{id}:
 *   post:
 *     summary: send email as admin
 *     description: Sends email to all the nasheed users.
 *     tags: [Send Email As Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: the admin id to get his email inorder to send the email all users but him.
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
    AsyncHandler(SendEmailController.sendEmail)
);

export default router;