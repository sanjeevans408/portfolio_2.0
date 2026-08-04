const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const projectsRouter = require("./routes/projects");
const contactRouter = require("./routes/contact");
const assistantRouter = require("./routes/assistant");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/assistant", assistantRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.warn(`MongoDB is unavailable; project and contact API data will be unavailable: ${err.message}`);
});
