const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById } = require("../controllers/note.controller");

// CRUD bulk routes first
router.post("/bulk", createBulkNotes);

// CRUD single-item routes
router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

module.exports = router;
