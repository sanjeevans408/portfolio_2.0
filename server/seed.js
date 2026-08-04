const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("./models/Project");
const sampleProjects = require("./sample-projects");

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB for seeding.");
    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log("Seeded project data successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
