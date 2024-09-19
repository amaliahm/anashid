import { Router } from "express";

// CONTROLLERS
import UsersController from "../controllers/users-controller.js";

// SCHEMA
import usersSchema from "../schemas/users-schema.js";

// MIDDLEWARES
import validator from "../middlewares/validator.js";
import AsyncHandler from "../middlewares/async-handler.js";

const router = Router();

router.get(
    "/:id",
    validator(usersSchema.getData, 'params'),
    AsyncHandler(UsersController.getAllUsers)
);

router.post(
  "/:id",
  validator(usersSchema.changeUserRole),
  AsyncHandler(UsersController.changeAccountType)
);

export default router;