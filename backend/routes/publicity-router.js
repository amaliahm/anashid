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

router.get(
    "/",
    AsyncHandler(PublicityController.getAllPublicity)
);

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(PublicityController.addPublicity)
);

router.delete(
    "/:id",
    validator(publicitySchema.deletePublicity, 'params'),
    AsyncHandler(PublicityController.deletePublicity)
);

export default router;