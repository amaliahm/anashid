import joi from "joi";

export default {
  addLanguage: joi.object({
    item: joi.string().required(),
  }),
  deleteLanguage: joi.object({
    id: joi.number().integer().required(),
  }),
};