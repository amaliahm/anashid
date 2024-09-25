import joi from "joi";

export default {
  sendEmail: joi.object({
    id: joi.number().integer().required(),
  }),
  emailContent: joi.object({
    subject: joi.string().required(),
    content: joi.string().required(),
  }),  
};