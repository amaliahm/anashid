import { Router } from "express";
import AsyncHandler from "../middlewares/AsyncHandler.js";
import validator from "../middlewares/validator.js";
import authSchema from "../schemas/authSchema.js";
import AuthController from "../controllers/authController.js";

const router = Router();

router.post(
  "/login",
  validator(authSchema.login),
  AsyncHandler(AuthController.login)
);

export default router;
