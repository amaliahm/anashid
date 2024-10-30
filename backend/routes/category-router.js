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

/**
 * @swagger
 * /{role}/category:
 *   get:
 *     summary: gets all categories
 *     description: fetches all categories with their details.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: role of the user requesting the categories details.
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: category id
 *                   category_name:
 *                     type: string
 *                   deleted_category:
 *                     type: boolean
 *                   file_path:
 *                     type: string
 *                   created_at:
 *                     type: date
 *                   anasheed_count:
 *                     type: integer
 *                     description: number of anasheed in this category.
 *       404:
 *         description: Failed to fetch categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch categories"
*/

router.get(
    "/",
    AsyncHandler(CategoryController.getAllCategories)
);

/**
 * @swagger
 * /admin/category/add:
 *   post:
 *     summary: add new category
 *     description: adds a new category with its image.
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *                 description: image file for the category
 *     responses:
 *       200:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category added successfully"
 *       404:
 *         description: Error in adding the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add category"
*/

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(CategoryController.addCategory)
);

/**
 * @swagger
 * /admin/category/{id}:
 *   put:
 *     summary: update category details
 *     description: updates the name of an existing category.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *       404:
 *         description: Failed to update category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update category"
*/

router.put(
    "/:id",
    validator(categorySchema.updateCategory),
    AsyncHandler(CategoryController.updateCategory)
);

/**
 * @swagger
 * /admin/category/{id}:
 *   delete:
 *     summary: mark category as deleted
 *     description: sets the is_deleted flag to true for the specified category.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category id
 *     responses:
 *       200:
 *         description: category marked as deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       404:
 *         description: Failed to delete category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete category"
*/

router.delete(
    "/:id",
    validator(categorySchema.deleteCategory, 'params'),
    AsyncHandler(CategoryController.deleteCategory)
);

/**
 * @swagger
 * /admin/category/trash:
 *   get:
 *     summary: retrieve list of deleted categories
 *     description: fetches a list of categories marked as deleted.
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of deleted categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: category id
 *                   category_name:
 *                     type: string
 *                   deleted_category:
 *                     type: boolean
 *                   file_path:
 *                     type: string
 *                   created_at:
 *                     type: date
 *       404:
 *         description: No deleted categories found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch categories"
*/

router.get(
    "/trash",
    AsyncHandler(CategoryController.trashCategory)
);

/**
 * @swagger
 * /admin/category/delete/{id}:
 *   delete:
 *     summary: permanently delete category.
 *     description: permanently delete the specified category from the database.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category id to be deleted
 *     responses:
 *       200:
 *         description: Category permanently deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       404:
 *         description: Failed to delete category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete category"
*/

router.delete(
    "/delete/:id",
    validator(categorySchema.deleteCategory, 'params'),
    AsyncHandler(CategoryController.confirmDeleteCategory)
);

/**
 * @swagger
 * /admin/category/restore/{id}:
 *   delete:
 *     summary: restore an archived category
 *     description: sets the `is_deleted` flag to false, restoring the specified category.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category id to be restored.
 *     responses:
 *       200:
 *         description: Category restored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category restored successfully"
 *       404:
 *         description: Failed to restore category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to restore category"
*/

router.delete(
    "/restore/:id",
    validator(categorySchema.deleteCategory, 'params'),
    AsyncHandler(CategoryController.restoreCategory)
);

export default router;