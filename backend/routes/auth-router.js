import { Router } from "express";

// MIDDLEWARES
import AsyncHandler from "../middlewares/async-handler.js";
import validator from "../middlewares/validator.js";

// SCHEMA
import authSchema from "../schemas/auth-schema.js";

// CONTROLLERS
import AuthController from "../controllers/auth-controller.js";

const router = Router();

router.post(
  "/login",
  validator(authSchema.login, 'body'),
  AsyncHandler(AuthController.login)
);

router.post(
  "/signup",
  validator(authSchema.signup),
  AsyncHandler(AuthController.signup)
);

router.post(
  "/verify-email",
  validator(authSchema.verifyEmail),
  AsyncHandler(AuthController.verifyEmail)
);

router.post(
  "/forget-password",
  validator(authSchema.forgetPassword),
  AsyncHandler(AuthController.forgetPassword)
);

router.post(
  "/reset-password/:token",
  validator(authSchema.resetPassword),
  AsyncHandler(AuthController.resetPassword)
);


export default router;