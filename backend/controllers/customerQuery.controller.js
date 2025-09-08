import db from "../models/index.js";
const CustomerQuery = db.CustomerQuery;

export const createQuery = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, device_model, issue_description } = req.body;
    const query = await CustomerQuery.create({
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      deviceModel: device_model,
      issueDescription: issue_description
    });
    res.status(201).json({ success: true, data: query });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database error" });
  }
};

export const getAllQueries = async (req, res) => {
  try {
    const queries = await CustomerQuery.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ success: true, data: queries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database error" });
  }
};
