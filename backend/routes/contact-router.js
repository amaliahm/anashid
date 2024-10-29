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
 * tags:
 *   name: Contact
 *   description: Contact routes
*/

router.post(
    "/:id",
    validator(sendEmailSchema.sendEmail, 'params'),
    validator(sendEmailSchema.emailContent),
    AsyncHandler(SendEmailController.contactEmail)
);

export default router;