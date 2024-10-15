import joi from "joi";

export default {
  addPlaylist: joi.object({
    id: joi.number().integer().required(), 
    name: joi.string().required(),
    photo: joi.any().meta({ swaggerType: 'file' }).required(),
  }),
  getPlaylist: joi.object({
    id: joi.number().integer().required(), 
  }),
  deletePlaylist: joi.object({
    id: joi.number().integer().required(), 
  }),
};