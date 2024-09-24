import joi from "joi";

export default {
  addGender: joi.object({
    item: joi.string().required(),
  }),
  deleteGender: joi.object({
    id: joi.number().integer().required(),
  }),
};