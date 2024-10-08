import joi from "joi";

export default {
  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
  signup: joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
  verifyEmail: joi.object({
    email: joi.string().email().required(),
  }),
  forgetPassword: joi.object({
    email: joi.string().email().required()
  }),
  resetPassword: joi.object({
    newPassword: joi.string().min(8).required()
  }),
  logout: joi.object({
    id: joi.number().integer().required(),
  }),
};