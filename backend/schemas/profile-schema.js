import joi from "joi";

export default {
  addPhoto: joi.object({
    id: joi.string().required(),
  }),
  getUser: joi.object({
    id: joi.number().integer().required(),
  }),
};