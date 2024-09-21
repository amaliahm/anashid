import joi from "joi";

export default {
  addAudio: joi.object({
    id: joi.number().integer().required(),
    title: joi.string().required(),
    description: joi.string().required(), 
    audio: joi.any().meta({ swaggerType: 'file' }).required(), 
  }),
  updateAudio: joi.object({
    id: joi.number().integer().required(),
    title: joi.string().required(),
    description: joi.string().required(),  
  }),
  deleteAudio: joi.object({
    id: joi.number().integer().required(), 
  }),
};