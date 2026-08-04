const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tech: { type: [String], required: true },
  live: { type: String, required: true },
  github: { type: String, required: true },
  features: { type: [String], default: [] },
});

module.exports = mongoose.model("Project", ProjectSchema);
