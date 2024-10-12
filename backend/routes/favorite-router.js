import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import favoriteSchema from "../schemas/favorite-schema.js";

// CONTROLLERS
import FavoriteController from "../controllers/favorite-controller.js";

const router = Router();

router.get(
    "/:id_user",
    validator(favoriteSchema.getFavoriteAnasheed, 'params'),
    AsyncHandler(FavoriteController.getFavorite)
);

router.post(
    "/add",
    validator(favoriteSchema.addToFavorite),
    AsyncHandler(FavoriteController.addToFavorite)
);

router.delete(
    "/remove",
    validator(favoriteSchema.removeFromFavorite),
    AsyncHandler(FavoriteController.removeFromFavorite)
);

export default router;