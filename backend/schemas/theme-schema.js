import joi from "joi";

export default {
  addTheme: joi.object({
    item: joi.string().required(),
  }),
  deleteTheme: joi.object({
    id: joi.number().integer().required(),
  }),
};