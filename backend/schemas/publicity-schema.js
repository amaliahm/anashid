import joi from "joi";

export default {
  deletePublicity: joi.object({
    id: joi.number().integer().required(),
  }),
};