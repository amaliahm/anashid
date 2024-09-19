import joi from "joi";

export default {
  login: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
  signup: {
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    account_name: joi.string().alphanum().min(3).max(30).required(),
  },
};
