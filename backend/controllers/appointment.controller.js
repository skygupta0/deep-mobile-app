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


export const getAppointmentByTicketAndPhone = async (req, res) => {
  try {
    const { ticketNumber, phoneNumber } = req.query;

    if (!ticketNumber || !phoneNumber) {
      return res.status(400).json({ message: "Ticket number and phone number are required" });
    }

    const appointment = await Appointment.findOne({
      where: { ticketNumber },
      include: [
        {
          model: CustomerQuery,
          as: "customerQuery",
          where: { phone_number: phoneNumber },
          attributes: ["id", "firstName", "phone_number"]
        }
      ]
    });

    if (!appointment) {
      return res.status(404).json({ message: "No appointment found for provided details" });
    }

    return res.json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    const { date, timeSlot, pickupRequired, status } = req.body;

    const appointment = await Appointment.findOne({ where: { ticketNumber } });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.update({
      date: date ?? appointment.date,
      timeSlot: timeSlot ?? appointment.timeSlot,
      pickupRequired: pickupRequired ?? appointment.pickupRequired,
      status: status ?? appointment.status
    });

    return res.status(200).json({
      message: "Appointment updated successfully",
      appointment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update appointment", error: error.message });
  }
};
