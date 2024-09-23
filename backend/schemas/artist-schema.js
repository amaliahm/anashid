import joi from "joi";

export default {
  addArtist: joi.object({
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