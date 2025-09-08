import express from "express";
import { createAppointment, checkSlotAvailability } from "../controllers/appointment.controller.js";
import { createAppointmentSchema, getAppointmentByTicketSchema, updateAppointmentSchema } from "../validators/appointment.validator.js";
import { validate } from "../middlewares/validate.js";
import { getAppointmentByTicketAndPhone, updateAppointment } from "../controllers/appointment.controller.js";
const router = express.Router();

router.post("/", validate(createAppointmentSchema), createAppointment);
router.get("/check-slot", checkSlotAvailability);
router.get("/get-by-ticket",validate(getAppointmentByTicketSchema, "query"), getAppointmentByTicketAndPhone);
router.put("/:ticketNumber", validate(updateAppointmentSchema), updateAppointment);

export default router;
