import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import categorySchema from "../schemas/category-schema.js";

// CONTROLLERS
import CategoryController from "../controllers/category-controller.js";

const router = Router();

router.get(
    "/",
    AsyncHandler(CategoryController.getAllCategories)
);

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(CategoryController.addCategory)
);

router.put(
    "/:id",
    validator(categorySchema.updateCategory),
    AsyncHandler(CategoryController.updateCategory)
);

router.delete(
    "/:id",
    validator(categorySchema.deleteCategory, 'params'),
    AsyncHandler(CategoryController.deleteCategory)
);

router.get(
    "/trash",
    AsyncHandler(CategoryController.trashCategory)
);

router.delete(
    "/delete/:id",
    validator(categorySchema.deleteCategory, 'params'),
    AsyncHandler(CategoryController.confirmDeleteCategory)
);

router.delete(
    "/restore/:id",
    validator(categorySchema.deleteCategory, 'params'),
    AsyncHandler(CategoryController.restoreCategory)
);

export default router;