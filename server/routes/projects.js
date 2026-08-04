const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to load projects." });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
