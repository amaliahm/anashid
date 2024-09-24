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

router.get(
    "/",
    AsyncHandler(GenderController.getAllGender)
);

router.post(
    "/add",
    validator(genderSchema.addGender),
    AsyncHandler(GenderController.addGender)
);

router.delete(
    "/:id",
    validator(genderSchema.deleteGender, 'params'),
    AsyncHandler(GenderController.deleteGender)
);

export default router;