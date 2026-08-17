const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/Project");
const sampleProjects = require("../sample-projects");
const router = express.Router();

router.get("/", async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json(sampleProjects);
  }

  try {
    const projects = await Project.find().sort({ id: 1 });
    res.json(projects.length ? projects : sampleProjects);
  } catch (error) {
    console.warn(`Projects database is unavailable; using bundled projects: ${error.message}`);
    res.json(sampleProjects);
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
