const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes } = require("../controllers/note.controller");

// CRUD bulk routes first
router.post("/bulk", createBulkNotes);

// CRUD single-item routes
router.post("/", createNote);

module.exports = router;
