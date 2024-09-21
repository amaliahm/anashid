import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import anasheedSchema from "../schemas/anasheed-schema.js";

// CONTROLLERS
import AnasheedController from "../controllers/anasheed-controller.js";

const router = Router();

router.get(
    "/",
    AsyncHandler(AnasheedController.getAllAnasheed)
);

router.post(
    "/add",
    validator(anasheedSchema.addAudio),
    AsyncHandler(AnasheedController.addAnasheed)
);

router.put(
    "/audio",
    validator(anasheedSchema.updateAudio),
    AsyncHandler(AnasheedController.updateAnasheed)
);

router.delete(
    "/audio/:id",
    validator(anasheedSchema.deleteAudio, 'params'),
    AsyncHandler(AnasheedController.deleteAnasheed)
);

export default router;