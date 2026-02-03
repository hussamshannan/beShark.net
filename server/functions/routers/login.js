const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");
require("dotenv").config();

const router = express.Router();

// Helper: Check if email credentials are configured
const isEmailConfigured = () => {
  return process.env.EMAIL && process.env.APP_PASSWORD;
};

// Helper: Create transporter (only if configured)
const createTransporter = () => {
  if (!isEmailConfigured()) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
};

// Helper: Send email notification (non-blocking, fire-and-forget)
const sendLoginNotification = (type, username, timestamp) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log("Email not configured, skipping login notification");
    return;
  }

  const isSuccess = type === "success";
  const subject = isSuccess
    ? `تسجيل دخول ناجح - ${timestamp}`
    : `محاولة تسجيل دخول فاشلة - ${timestamp}`;
  const message = isSuccess
    ? `تم تسجيل دخول ناجح للمستخدم: <strong>${username}</strong>`
    : `تمت محاولة تسجيل دخول فاشلة للمستخدم: <strong>${username}</strong>`;

  // Fire-and-forget: don't await, just log errors
  transporter
    .sendMail({
      from: `"shark-plan" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject,
      html: `
        <div dir="rtl" style="text-align: right; font-family: system-ui, Arial, sans-serif; font-size: 16px;">
          <p>${message}</p>
          <p>التاريخ والوقت: ${timestamp}</p>
        </div>
      `,
    })
    .then(() => console.log(`Login notification sent: ${type}`))
    .catch((err) => console.error("Failed to send login notification:", err.message));
};

// POST /signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const now = moment.tz("Asia/Qatar").format("YYYY-MM-DD hh:mm:ss A");

  try {
    const user = await User.findOne({ username });
    if (!user) {
      // Send failure notification (non-blocking)
      sendLoginNotification("failure", username, now);
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Send failure notification (non-blocking)
      sendLoginNotification("failure", username, now);
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send success notification (non-blocking)
    sendLoginNotification("success", username, now);

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
