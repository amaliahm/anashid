import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";

// SCHEMA
import searchSchema from "../schemas/search-schema.js";

// CONTROLLERS
import SearchController from "../controllers/search-controller.js";

const router = Router();

router.put(
    "/",
    validator(searchSchema.search),
    AsyncHandler(SearchController.searchForNasheed)
);

router.put(
    "/filter",
    validator(searchSchema.filter),
    AsyncHandler(SearchController.filterForNasheed)
);

export default router;