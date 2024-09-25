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

router.post(
    "/add",
    upload.fields([
        { name: 'photo', maxCount: 1 }, 
        { name: 'audio', maxCount: 1 }
    ]),
    validator(anasheedSchema.addAnasheed),
    AsyncHandler(AnasheedController.addAnasheed)
);

export default router;