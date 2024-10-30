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

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile routes
*/

router.use("/admin/profile", ProfileRouter);
router.use("/user/profile", ProfileRouter);

/**
 * @swagger
 * tags:
 *   name: Publicity
 *   description: Publicity routes
*/

router.use("/admin/publicity", PublicityRouter);
router.use("/user/publicity", PublicityRouter);

/**
 * @swagger
 * tags:
 *   name: Gender
 *   description: Gender routes
*/

router.use('/admin/gender', GenderRouter);
router.use('/user/gender', GenderRouter);

/**
 * @swagger
 * tags:
 *   name: Theme
 *   description: Theme routes
*/

router.use('/admin/theme', ThemeRouter);
router.use('/user/theme', ThemeRouter);

/**
 * @swagger
 * tags:
 *   name: Language
 *   description: Language routes
*/

router.use('/admin/language', LanguageRouter);
router.use('/user/language', LanguageRouter);

/**
 * @swagger
 * tags:
 *   name: Send Email As Admin
 *   description: Admin Sends Email routes
*/

router.use("/admin/sendEmail", SendEmailRouter);

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact routes
*/

router.use("/user/sendEmail", ConactRouter);

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: Favorite routes
*/

router.use("/user/favorites", FavoriteRouter);

/**
 * @swagger
 * tags:
 *   name: Listening History
 *   description: Listening History routes
*/

router.use("/user/playednow", PlayedNowRouter);

/**
 * @swagger
 * tags:
 *   name: Search/Filter
 *   description: Search/Filter routes
*/

router.use("/user/search", SearchRouter);







export default router;