import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import playedNowSchema from "../schemas/played-now-schema.js";

// CONTROLLERS
import PlayedNowController from "../controllers/played-now-controller.js";

const router = Router();

router.get(
    "/:id_user",
    validator(playedNowSchema.getLastListening, 'params'),
    AsyncHandler(PlayedNowController.getLastListening)
);

router.get(
    "/:id_user/:id_anasheed",
    validator(playedNowSchema.getListening, 'params'),
    AsyncHandler(PlayedNowController.getAllListening)
);

router.post(
    "/add",
    validator(playedNowSchema.addListening),
    AsyncHandler(PlayedNowController.addListening)
);

export default router;