import { Router } from "express";

// ROUTES
import authRouter from "./auth-router.js";
import usersRouter from "./users-router.js"
import anasheedRouter from './anasheed-router.js'
import artistRouter from './artist-router.js'
import CategoryRouter from './category-router.js'

const router = Router();

router.use("/auth", authRouter);

router.use("/admin/users", usersRouter);

router.use("/admin/anasheed", anasheedRouter);

router.use("/admin/artist", artistRouter);

router.use("/admin/category", CategoryRouter);

export default router;