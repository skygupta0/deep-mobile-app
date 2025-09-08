import express from "express";
import { createAppointment, checkSlotAvailability } from "../controllers/appointment.controller.js";
import { createAppointmentSchema } from "../validators/appointment.validator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", validate(createAppointmentSchema), createAppointment);
router.get("/check-slot", checkSlotAvailability);

export default router;
