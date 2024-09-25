import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import languageSchema from "../schemas/language-schema.js";

// CONTROLLERS
import LanguageController from "../controllers/language-controller.js";

const router = Router();

router.get(
    "/",
    AsyncHandler(LanguageController.getAllLanguage)
);

router.post(
    "/add",
    validator(languageSchema.addLanguage),
    AsyncHandler(LanguageController.addLanguage)
);

router.delete(
    "/:id",
    validator(languageSchema.deleteLanguage, 'params'),
    AsyncHandler(LanguageController.deleteLanguage)
);

export default router;