import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import artistSchema from "../schemas/artist-schema.js";

// CONTROLLERS
import ArtistController from "../controllers/artist-controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Artist
 *   description: Artist routes
*/

router.get(
    "/",
    AsyncHandler(ArtistController.getAllArtists)
);

router.post(
    "/add",
    upload.single('photo'),
    AsyncHandler(ArtistController.addArtist)
);

router.put(
    "/:id",
    validator(artistSchema.updateArtist),
    AsyncHandler(ArtistController.updateArtist)
);

router.delete(
    "/:id",
    validator(artistSchema.deleteArtist, 'params'),
    AsyncHandler(ArtistController.deleteArtist)
);

router.get(
    "/trash",
    AsyncHandler(ArtistController.trashArtist)
);

router.delete(
    "/delete/:id",
    validator(artistSchema.deleteArtist, 'params'),
    AsyncHandler(ArtistController.confirmDeleteArtist)
);

router.delete(
    "/restore/:id",
    validator(artistSchema.deleteArtist, 'params'),
    AsyncHandler(ArtistController.restoreArtist)
);

export default router;