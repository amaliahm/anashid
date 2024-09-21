import joi from "joi";

export default {
  getArtist: joi.object({
    id: joi.number().integer().required(),
  }),
  addArtist: joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required(),
    bio: joi.string().required(),  
  }),
  updateArtist: joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required(),
    bio: joi.string().required(),  
  }),
  deleteArtist: joi.object({
    id: joi.number().integer().required(), 
  }),
};