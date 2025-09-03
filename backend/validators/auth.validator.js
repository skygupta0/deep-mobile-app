import Joi from "joi";

export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).required(),
  phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).required()
});

export const signinSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
