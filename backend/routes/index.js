import { Router } from "express";

// ROUTES
import authRouter from "./auth-router.js";

const router = Router();

router.use("/auth", authRouter);

export default router;