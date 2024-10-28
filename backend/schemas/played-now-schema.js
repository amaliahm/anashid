import joi from "joi";

export default {
  getListening: joi.object({
    id_user: joi.number().integer().required(),
  }),
  addListening: joi.object({
    id_anasheed: joi.number().integer().required(),
    id_user: joi.number().integer().required(),
    position: joi.number().integer().required(),
  }),
};