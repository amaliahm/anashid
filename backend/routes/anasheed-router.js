import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import anasheedSchema from "../schemas/anasheed-schema.js";

// CONTROLLERS
import AnasheedController from "../controllers/anasheed-controller.js";

const router = Router();

router.get(
    "/",
    AsyncHandler(AnasheedController.getAllAnasheed)
);

router.get(
    "/:id",
    validator(anasheedSchema.favoriteAnasheed, 'params'),
    AsyncHandler(AnasheedController.getAllAnasheedWithFavorite)
);

router.get(
    "/category/:id/:user",
    validator(anasheedSchema.getCategoryAnasheed, 'params'),
    AsyncHandler(AnasheedController.getCategoryAnasheed)
);

router.get(
    "/artist/:id/:user",
    validator(anasheedSchema.getArtistAnasheed, 'params'),
    AsyncHandler(AnasheedController.getArtistAnasheed)
);

router.get(
    "/playlist/:id/:id_playlist",
    validator(anasheedSchema.getPlaylistAnasheed, 'params'),
    AsyncHandler(AnasheedController.getPlaylistAnasheed)
);

router.post(
    "/add",
    upload.fields([
        { name: 'photo', maxCount: 1 }, 
        { name: 'audio', maxCount: 1 }
    ]),
    validator(anasheedSchema.addAnasheed),
    AsyncHandler(AnasheedController.addAnasheed)
);

router.put(
    "/update",
    validator(anasheedSchema.updateAnasheed),
    AsyncHandler(AnasheedController.updateAnasheed)
);

router.delete(
    "/:id",
    validator(anasheedSchema.deleteAnasheed, 'params'),
    AsyncHandler(AnasheedController.deleteAnasheed)
);

router.get(
    "/trash",
    AsyncHandler(AnasheedController.trashAnasheed)
);

router.delete(
    "/delete/:id",
    validator(anasheedSchema.deleteAnasheed, 'params'),
    AsyncHandler(AnasheedController.confirmDeleteAnasheed)
);

router.delete(
    "/restore/:id",
    validator(anasheedSchema.deleteAnasheed, 'params'),
    AsyncHandler(AnasheedController.restoreAnasheed)
);

export default router;