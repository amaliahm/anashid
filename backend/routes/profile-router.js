import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import profileSchema from "../schemas/profile-schema.js";

// CONTROLLERS
import ProfileController from "../controllers/profile-controller.js";

const router = Router();

router.post(
    "/add/:id",
    upload.single('photo'),
    validator(profileSchema.addPhoto, 'params'),
    AsyncHandler(ProfileController.addProfilePhoto)
);

router.get(
    "/:id",
    validator(profileSchema.getUser, 'params'),
    AsyncHandler(ProfileController.getUser)
);

export default router;