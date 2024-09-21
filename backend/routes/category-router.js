import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import categorySchema from "../schemas/category-schema.js";

// CONTROLLERS
import CategoryController from "../controllers/category-controller.js";

const router = Router();

router.get(
    "/",
    AsyncHandler(ArtistController.getAllArtists)
);

router.get(
    "/:id",
    validator(categorySchema.getCategory, 'params'),
    AsyncHandler(CategoryController.getAllCategorys)
);

router.post(
    "/add",
    validator(categorySchema.addCategory),
    AsyncHandler(CategoryController.addCategory)
);

router.put(
    "/audio",
    validator(categorySchema.updateCategory),
    AsyncHandler(CategoryController.updateCategory)
);

router.delete(
    "/audio/:id",
    validator(categorySchema.deleteCategory, 'params'),
    AsyncHandler(CategoryController.deleteCategory)
);

export default router;