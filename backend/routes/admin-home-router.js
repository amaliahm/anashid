import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";

// CONTROLLERS
import AdminHomeController from "../controllers/admin-home-controller.js";

const router = Router();

router.get(
    "/",
    AsyncHandler(AdminHomeController.getData)
);

export default router;