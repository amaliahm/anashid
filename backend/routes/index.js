import { Router } from "express";

// ROUTES
import authRouter from "./auth-router.js";
import usersRouter from "./users-router.js"
import anasheedRouter from './anasheed-router.js'

const router = Router();

router.use("/auth", authRouter);

router.use("/admin/users", usersRouter);

router.use("/admin/anasheed", anasheedRouter);

export default router;