import joi from "joi";

export default {
  addAnasheed: joi.object({
    title: joi.string().required(),
    description: joi.string().required(), 
    duration: joi.number().precision(3).positive().required(), 
    id_artist: joi.number().integer().required(), 
    id_language: joi.number().integer().required(), 
    id_theme: joi.number().integer().required(), 
    id_gender: joi.number().integer().required(), 
    id_category: joi.number().integer().required(), 
  }),
  updateAnasheed: joi.object({
    id: joi.number().integer().required(),
    title: joi.string().required(),
    description: joi.string().required(),  
  }),
  deleteAnasheed: joi.object({
    id: joi.number().integer().required(),
  }),
  getCategoryAnasheed: joi.object({
    id: joi.number().integer().required(),
    user: joi.number().integer().required(),
  }),
  getArtistAnasheed: joi.object({
    id: joi.number().integer().required(),
    user: joi.number().integer().required(),
  }),
  favoriteAnasheed: joi.object({
    id: joi.number().integer().required(),
  }),
  getPlaylistAnasheed: joi.object({
    id: joi.number().integer().required(),
    id_playlist: joi.number().integer().required(),
  }),
};