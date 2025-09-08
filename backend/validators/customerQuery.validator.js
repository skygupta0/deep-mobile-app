import Joi from "joi";

export const createQuerySchema = Joi.object({
  first_name: Joi.string().min(2).max(100).required(),
  last_name: Joi.string().min(2).max(100).required(),
  phone_number: Joi.string().min(10).max(15).required(),
  device_model: Joi.string().required(),
  issue_description: Joi.string().required()
});
