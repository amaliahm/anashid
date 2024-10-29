import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";

// CONTROLLERS
import AdminHomeController from "../controllers/admin-home-controller.js";

const router = Router();





// * /auth/login:
// *   post:
// *     summary: Log in a user
// *     tags: [Auth]
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               username:
// *                 type: string
// *               password:
// *                 type: string
// *     responses:
// *       200:
// *         description: Successful login
// *       401:
// *         description: Unauthorized

router.get(
    "/",
    AsyncHandler(AdminHomeController.getData)
);

export default router;