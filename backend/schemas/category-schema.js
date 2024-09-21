import joi from "joi";

export default {
  getCategory: joi.object({
    id: joi.number().integer().required(),
  }),
  addCategory: joi.object({
    name: joi.string().required(),
    photo: joi.any().meta({ swaggerType: 'file' }).required(),
  }),
  updateCategory: joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required(),
  }),
  deleteCategory: joi.object({
    id: joi.number().integer().required(), 
  }),
};