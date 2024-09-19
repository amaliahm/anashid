import { Router } from "express";

// ROUTES
import authRouter from "./auth-router.js";
import usersRouter from "./users-router.js"

const router = Router();

router.use("/auth", authRouter);

router.use("/admin/users", usersRouter);

export default router;