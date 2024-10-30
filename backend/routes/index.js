import { Router } from "express";

// ROUTES
import authRouter from "./auth-router.js";
import usersRouter from "./users-router.js"

import artistRouter from './artist-router.js'

import anasheedRouter from './anasheed-router.js'
import CategoryRouter from './category-router.js'
import FavoriteRouter from './favorite-router.js'
import PlaylistRouter from './playlist-router.js'

import ProfileRouter from './profile-router.js'
import AdminHomeRouter from './admin-home-router.js'

import PublicityRouter from './publicity-router.js'
import GenderRouter from './gender-router.js'
import ThemeRouter from './theme-router.js'
import LanguageRouter from './language-router.js'

import SendEmailRouter from './sendEmail-router.js'
import ConactRouter from './contact-router.js'

import PlayedNowRouter from './played-now-router.js'

import SearchRouter from './search-router.js'

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
*/

router.use("/auth", authRouter);

/**
 * @swagger
 * tags:
 *   name: Admin Home
 *   description: Admin Home routes
*/

router.use("/admin/home", AdminHomeRouter);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users routes
*/

router.use("/admin/users", usersRouter);

/**
 * @swagger
 * tags:
 *   name: Anasheed
 *   description: Anasheed routes
*/

router.use("/admin/anasheed", anasheedRouter);
router.use("/user/anasheed", anasheedRouter);

/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist routes
*/

router.use("/user/playlists", PlaylistRouter);

/**
 * @swagger
 * tags:
 *   name: Artist
 *   description: Artist routes
*/

router.use("/admin/artists", artistRouter);
router.use("/user/artists", artistRouter);


/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category routes
*/

router.use("/admin/categories", CategoryRouter);
router.use("/user/categories", CategoryRouter);

router.use("/admin/profile", ProfileRouter);
router.use("/user/profile", ProfileRouter);

router.use("/admin/publicity", PublicityRouter);
router.use("/user/publicity", PublicityRouter);

router.use('/admin/gender', GenderRouter);
router.use('/user/gender', GenderRouter);

router.use('/admin/theme', ThemeRouter);
router.use('/user/theme', ThemeRouter);

router.use('/admin/language', LanguageRouter);
router.use('/user/language', LanguageRouter);

router.use("/admin/sendEmail", SendEmailRouter);
router.use("/user/sendEmail", ConactRouter);

router.use("/user/favorites", FavoriteRouter);

router.use("/user/playednow", PlayedNowRouter);

router.use("/user/search", SearchRouter);

export default router;