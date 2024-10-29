import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";

// CONTROLLERS
import AdminHomeController from "../controllers/admin-home-controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Home
 *   description: Admin Home routes
*/

/**
 * @swagger
 * /admin/home:
 *   get:
 *     summary: get data for admin dashboard
 *     description: fetches various statistics/data for the admin dashboard, including total users/anasheed/categories, new users, how many anasheed there are in each category/to the artist, popular categories/anasheed, and active users.
 *     tags: [Admin Home]
 *     responses:
 *       200:
 *         description: successfully fetched data/statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_users:
 *                   type: integer
 *                 total_anasheed:
 *                   type: integer
 *                 total_categories:
 *                   type: integer
 *                 new_users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: date
 *                       users:
 *                         type: integer
 *                 anasheed_into_categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category_name:
 *                         type: string
 *                       anasheed_count:
 *                         type: integer
 *                       file_path:
 *                         type: string
 *                 artists:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       artist_name:
 *                         type: string
 *                       anasheed_count:
 *                         type: integer
 *                 popularCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       category_name:
 *                         type: string
 *                       duration:
 *                         type: integer
 *                 popularAnasheed:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nasheed_title:
 *                         type: string
 *                       duration:
 *                         type: integer
 *                 maxCategory:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                 active_users:
 *                   type: object
 *                   properties:
 *                     logged_in_today:
 *                       type: integer
 *                       description: number of users who logged in today.
 *                     logged_in_last_week:
 *                       type: integer
 *                       description: number of users who logged in during the last week.
 *                     logged_in_last_month:
 *                       type: integer
 *                       description: number of users who logged in during the last month.
 *                     logged_in_last_two_months:
 *                       type: integer
 *                       description: number of users who logged in during the last two months.
 *       404:
 *         description: Failed to fetch data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to fetch data'
*/

router.get(
    "/",
    AsyncHandler(AdminHomeController.getData)
);

export default router;