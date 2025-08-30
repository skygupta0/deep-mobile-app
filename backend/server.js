const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API to insert customer query
app.post("/api/queries", async (req, res) => {
  try {
    const { first_name, last_name, phone_number, device_model, issue_description } = req.body;

    const result = await pool.query(
      `INSERT INTO customer_queries 
      (first_name, last_name, phone_number, device_model, issue_description) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, phone_number, device_model, issue_description]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
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
    const result = await pool.query(
      `SELECT * FROM customer_queries ORDER BY created_at DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Database error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



