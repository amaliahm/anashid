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
import ThemeRouter from './theme-router.js'
import LanguageRouter from './language-router.js'

import SendEmailRouter from './sendEmail-router.js'
import ConactRouter from './contact-router.js'

import AdminHomeRouter from './admin-home-router.js'
import FavoriteRouter from './favorite-router.js'

const router = Router();

router.use("/auth", authRouter);

router.use("/admin/home", AdminHomeRouter);

router.use("/admin/users", usersRouter);

router.use("/admin/anasheed", anasheedRouter);
router.use("/user/anasheed", anasheedRouter);

router.use("/admin/artists", artistRouter);
router.use("/user/artists", artistRouter);

router.use("/admin/categories", CategoryRouter);
router.use("/user/categories", CategoryRouter);

router.use("/admin/profile", ProfileRouter);
router.use("/user/profile", ProfileRouter);

router.use("/admin/publicity", PublicityRouter);
router.use("/user/publicity", PublicityRouter);

router.use('/admin/gender', GenderRouter);

router.use('/admin/theme', ThemeRouter);

router.use('/admin/language', LanguageRouter);

router.use("/admin/sendEmail", SendEmailRouter);
router.use("/user/sendEmail", ConactRouter);

router.use("/user/favorites", FavoriteRouter);

export default router;