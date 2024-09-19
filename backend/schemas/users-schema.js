import joi from "joi";

export default {
  getData: joi.object({
    id: joi.number().integer().required(),
  }),
  changeUserRole: joi.object({
    userId: joi.number().integer().required(),
    password: joi.string().min(8).required(),
    account_type: joi.string().required(),
    adminId: joi.number().integer().required(),
  }),
};