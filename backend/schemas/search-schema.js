import joi from "joi";

export default {
  search: joi.object({
    searchQuery: joi.string().required(),
  }),
  filter: joi.object({
    gender: joi.number().integer().allow(null),
    theme: joi.number().integer().allow(null),
    language: joi.number().integer().allow(null),
  }),
};