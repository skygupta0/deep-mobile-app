import db from "../models/index.js";
const Appointment = db.Appointment;
const CustomerQuery = db.CustomerQuery;

/**
 * Create a new appointment
 */
export const createAppointment = async (req, res) => {
  try {
    const { customerQueryId, date, timeSlot, pickupRequired } = req.body;
    if (customerQueryId) {
      const queryExists = await CustomerQuery.findByPk(customerQueryId);
      if (!queryExists) {
        return res.status(404).json({ success: false, error: "Customer query not found" });
      }
    }

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      where: { date, timeSlot }
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, error: "Slot already booked" });
    }

    const appointment = await Appointment.create({
      customerQueryId: customerQueryId || null,
      date,
      timeSlot,
      pickupRequired: pickupRequired || false,
      status: "PENDING"
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database error" });
  }
};

/**
 * Check availability for a specific date & time
 */
export const checkSlotAvailability = async (req, res) => {
  try {
    const { date, timeSlot } = req.query;

    if (!date || !timeSlot) {
      return res.status(400).json({ success: false, error: "date and timeSlot are required" });
    }

    const existingAppointment = await Appointment.findOne({
      where: { date, timeSlot }
    });

    res.json({
      success: true,
      available: existingAppointment ? false : true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database error" });
  }
};
