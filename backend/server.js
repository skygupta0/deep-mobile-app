const express = require("express");
const cors = require("cors");
const db = require('./models');
const CustomerQuery = db.CustomerQuery;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
db.sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => { console.error('DB connect error', err); process.exit(1); });


// API to insert customer query
app.post("/api/queries", async (req, res) => {
  try {
    const { first_name, last_name, phone_number, device_model, issue_description } = req.body;
    const created = await CustomerQuery.create({
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      deviceModel: device_model,
      issueDescription: issue_description
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// ========================
// 📌 API: Fetch all customer queries
// ========================
app.get("/api/get_all_queries", async (req, res) => {
  try {
    const result = await CustomerQuery.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Database error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



