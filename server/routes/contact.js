const express = require("express");
const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Contact storage is currently unavailable.",
      fallback: "email",
    });
  }

  try {
    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    await contact.save();
    res.status(201).json({ message: "Contact message saved" });
  } catch (error) {
    console.error(`Failed to save contact message: ${error.message}`);
    res.status(503).json({
      error: "Contact storage is currently unavailable.",
      fallback: "email",
    });
  }
});

module.exports = router;
