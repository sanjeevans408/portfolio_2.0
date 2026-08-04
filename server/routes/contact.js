const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact message saved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
