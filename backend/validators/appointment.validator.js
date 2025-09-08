import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  customerQueryId: Joi.number().optional(),
  date: Joi.date().required(),
  timeSlot: Joi.string().required(),
  pickupRequired: Joi.boolean().optional()
});
