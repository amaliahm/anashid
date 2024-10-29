import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import themeSchema from "../schemas/theme-schema.js";

// CONTROLLERS
import ThemeController from "../controllers/theme-controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Theme
 *   description: Theme routes
*/

router.get(
    "/",
    AsyncHandler(ThemeController.getAllTheme)
);

router.post(
    "/add",
    validator(themeSchema.addTheme),
    AsyncHandler(ThemeController.addTheme)
);

router.delete(
    "/:id",
    validator(themeSchema.deleteTheme, 'params'),
    AsyncHandler(ThemeController.deleteTheme)
);

export default router;