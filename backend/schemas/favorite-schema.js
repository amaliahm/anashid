import joi from "joi";

export default {
  getFavoriteAnasheed: joi.object({
    id_user: joi.number().integer().required(), 
  }),
  addToFavorite: joi.object({
    id_user: joi.number().integer().required(), 
    id_anasheed: joi.number().integer().required(), 
  }),
  removeFromFavorite: joi.object({
    id_user: joi.number().integer().required(), 
    id_anasheed: joi.number().integer().required(), 
  }),
};