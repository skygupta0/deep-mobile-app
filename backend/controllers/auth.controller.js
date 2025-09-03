import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/auth.js";

const User = db.User;

export const signup = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name, phone_number } = req.body;
    const hashed = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      password: hashed
    });

    res.status(201).json({ id: user.id, username: user.username });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE_IN || "1h" }
    );

    res.json({ username: user.username, isAdmin: user.isAdmin, accessToken });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: "Signin failed" });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.user.username } });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
