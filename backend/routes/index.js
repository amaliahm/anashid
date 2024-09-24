import { Router } from "express";

// ROUTES
import authRouter from "./auth-router.js";
import usersRouter from "./users-router.js"
import anasheedRouter from './anasheed-router.js'
import artistRouter from './artist-router.js'
import CategoryRouter from './category-router.js'
import ProfileRouter from './profile-router.js'
import PublicityRouter from './publicity-router.js'
import GenderRouter from './gender-router.js'

const router = Router();

router.use("/auth", authRouter);

router.use("/admin/users", usersRouter);

router.use("/admin/anasheed", anasheedRouter);

router.use("/admin/artists", artistRouter);

router.use("/admin/categories", CategoryRouter);

router.use("/admin/profile", ProfileRouter);

router.use("/admin/publicity", PublicityRouter);

router.use('/admin/gender', GenderRouter);

export default router;