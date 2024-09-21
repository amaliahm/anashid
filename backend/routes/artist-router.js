import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import artistSchema from "../schemas/artist-schema.js";

// CONTROLLERS
import ArtistController from "../controllers/artist-controller.js";

const router = Router();

router.get(
    "/",
    AsyncHandler(ArtistController.getAllArtists)
);

router.get(
    "/:id",
    validator(artistSchema.getArtist, 'params'),
    AsyncHandler(ArtistController.getArtist)
);

router.post(
    "/add",
    validator(artistSchema.addArtist),
    AsyncHandler(ArtistController.addArtist)
);

router.put(
    "/audio",
    validator(artistSchema.updateArtist),
    AsyncHandler(ArtistController.updateArtist)
);

router.delete(
    "/audio/:id",
    validator(artistSchema.deleteArtist, 'params'),
    AsyncHandler(ArtistController.deleteArtist)
);

export default router;