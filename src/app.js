const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/notes", require("./routes/note.routes"));

// Basic Health Check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Notes API is running" });
});

module.exports = app;
