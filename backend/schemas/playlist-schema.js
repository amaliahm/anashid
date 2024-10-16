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
  addToPlaylist: joi.object({
    id: joi.number().integer().required(), 
    id_nasheed: joi.number().integer().required(), 
  }),
  removeFromPlaylist: joi.object({
    anasheed_playlist_id: joi.number().integer().required(),
  }),
};