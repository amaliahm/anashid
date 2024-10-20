import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import playlistSchema from "../schemas/playlist-schema.js";

// CONTROLLERS
import PlaylistController from "../controllers/playlist-controller.js";

const router = Router();

router.get(
    "/:id",
    validator(playlistSchema.getPlaylist, 'params'),
    AsyncHandler(PlaylistController.getPlaylists)
);

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(PlaylistController.addPlaylist)
);

router.post(
    "/nasheed/add",
    validator(playlistSchema.addToPlaylist),
    AsyncHandler(PlaylistController.addToPlaylist)
);

router.post(
    "/nasheed/remove/:anasheed_playlist_id",
    validator(playlistSchema.removeFromPlaylist, 'params'),
    AsyncHandler(PlaylistController.removeFromPlaylist)
);

router.delete(
    "/:id",
    validator(playlistSchema.deletePlaylist, 'params'),
    AsyncHandler(PlaylistController.deletePlaylist)
);

export default router;