import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  customerQueryId: Joi.number().optional(),
  date: Joi.date().required(),
  timeSlot: Joi.string().required(),
  pickupRequired: Joi.boolean().optional()
});

export const getAppointmentByTicketSchema = Joi.object({
  ticketNumber: Joi.string().required().messages({
    "any.required": "Ticket number is required",
    "string.empty": "Ticket number cannot be empty"
  }),
  phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "any.required": "Phone number is required",
    "string.pattern.base": "Phone number must be a valid 10-digit number"
  })
});

export const updateAppointmentSchema = Joi.object({
  date: Joi.date().optional(),
  timeSlot: Joi.string().optional(),
  pickupRequired: Joi.boolean().optional(),
  status: Joi.string().valid("PENDING", "CONFIRMED", "CANCELLED", "COMPLETED").optional()
}).min(1);
