import express from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport.js";
import db from "../models/index.js";
const User = db.User;
import { hashPassword, comparePassword } from "../utils/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password, first_name, last_name, phone_number  } = req.body;
  const hashed = await hashPassword(password);
  const user = await User.create({ username, email, firstName: first_name, lastName: last_name, phoneNumber: phone_number, password: hashed });
  res.json({ id: user.id, username: user.username });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !await comparePassword(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const accessToken = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE_IN || "1h"
  });
  res.json({ username: user.username, isAdmin: user.isAdmin, accessToken });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ where: { username: req.user.username } });
    res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin, phoneNumber: user.phoneNumber });
  }
);

export default router;