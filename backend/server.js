import express from "express"
import cors from 'cors'
import authRoutes from "./routes/auth.js";
import customerQueryRoutes from "./routes/customerQuery.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import passport from "./config/passport.js";
import dotenv from 'dotenv';
dotenv.config();
import db from "./models/index.js";
const CustomerQuery = db.CustomerQuery;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
db.sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => { console.error('DB connect error', err); process.exit(1); });


app.use("/api/auth", authRoutes);
app.use("/api/queries", customerQueryRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



