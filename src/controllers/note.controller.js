const mongoose = require("mongoose");
const Note = require("../models/note.model");

// @desc    Create a single note
// @route   POST /api/notes
// @access  Public
exports.createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      isPinned,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Create multiple notes
// @route   POST /api/notes/bulk
// @access  Public
exports.createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    // Validation
    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "notes array is required and cannot be empty",
        data: null,
      });
    }

    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get note by ID
// @route   GET /api/notes/:id
// @access  Public
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Full replace note
// @route   PUT /api/notes/:id
// @access  Public
exports.replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    // Check for empty body or missing required fields for PUT
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required for full replacement",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Partial update note
// @route   PATCH /api/notes/:id
// @access  Public
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    // Check for empty body
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Delete single note
// @route   DELETE /api/notes/:id
// @access  Public
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Delete multiple notes
// @route   DELETE /api/notes/bulk
// @access  Public
exports.deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    // Validation
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids array is required and cannot be empty",
        data: null,
      });
    }

    // Validate all IDs in the array
    for (const id of ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: `Invalid ID found: ${id}`,
          data: null,
        });
      }
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get notes by category
// @route   GET /api/notes/category/:category
// @access  Public
exports.getNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const allowed = ["work", "personal", "study"];

    if (!allowed.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Allowed: work, personal, study",
        data: null,
      });
    }

    const notes = await Note.find({ category });

    if (notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No notes found for category: ${category}`,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: `Notes fetched for category: ${category}`,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get notes by status
// @route   GET /api/notes/status/:isPinned
// @access  Public
exports.getNotesByStatus = async (req, res) => {
  try {
    const { isPinned } = req.params;

    if (isPinned !== "true" && isPinned !== "false") {
      return res.status(400).json({
        success: false,
        message: "isPinned must be true or false",
        data: null,
      });
    }

    const pinned = isPinned === "true";
    const notes = await Note.find({ isPinned: pinned });

    res.status(200).json({
      success: true,
      message: pinned ? "Fetched all pinned notes" : "Fetched all unpinned notes",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get note summary
// @route   GET /api/notes/:id/summary
// @access  Public
exports.getNoteSummary = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const note = await Note.findById(id).select("title category isPinned createdAt");

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note summary fetched successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Filter notes
// @route   GET /api/notes/filter
// @access  Public
exports.filterNotes = async (req, res) => {
  try {
    const filter = {};
    const { category, isPinned } = req.query;

    if (category) {
      filter.category = category;
    }

    if (isPinned !== undefined) {
      filter.isPinned = isPinned === "true";
    }

    const notes = await Note.find(filter);

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Get pinned notes
// @route   GET /api/notes/filter/pinned
// @access  Public
exports.getPinnedNotes = async (req, res) => {
  try {
    const filter = { isPinned: true };
    const { category } = req.query;

    if (category) {
      filter.category = category;
    }

    const notes = await Note.find(filter);

    res.status(200).json({
      success: true,
      message: "Pinned notes fetched successfully",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Filter notes by category
// @route   GET /api/notes/filter/category
// @access  Public
exports.filterByCategory = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Query param 'name' is required",
        data: null,
      });
    }

    const notes = await Note.find({ category: name });

    res.status(200).json({
      success: true,
      message: `Notes filtered by category: ${name}`,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Filter notes by date range
// @route   GET /api/notes/filter/date-range
// @access  Public
exports.filterByDateRange = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Both 'from' and 'to' query params are required",
        data: null,
      });
    }

    const filter = {
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    };

    const notes = await Note.find(filter);

    res.status(200).json({
      success: true,
      message: `Notes fetched between ${from} and ${to}`,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Paginate all notes
// @route   GET /api/notes/paginate
// @access  Public
exports.paginateNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Note.countDocuments();
    const totalPages = Math.ceil(total / limit);
    const notes = await Note.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Paginate notes by category
// @route   GET /api/notes/paginate/category/:category
// @access  Public
exports.paginateByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { category };
    const total = await Note.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const notes = await Note.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      message: `Notes fetched for category: ${category}`,
      data: notes,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Sort all notes
// @route   GET /api/notes/sort
// @access  Public
exports.sortNotes = async (req, res) => {
  try {
    const allowed = ["title", "createdAt", "updatedAt", "category"];
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    if (!allowed.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sortBy. Allowed: ${allowed.join(", ")}`,
        data: null,
      });
    }

    const notes = await Note.find().sort({ [sortBy]: order });

    res.status(200).json({
      success: true,
      message: `Notes sorted by ${sortBy} in ${order === 1 ? "ascending" : "descending"} order`,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// @desc    Sort pinned notes
// @route   GET /api/notes/sort/pinned
// @access  Public
exports.sortPinnedNotes = async (req, res) => {
  try {
    const allowed = ["title", "createdAt", "updatedAt", "category"];
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    if (!allowed.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sortBy. Allowed: ${allowed.join(", ")}`,
        data: null,
      });
    }

    const notes = await Note.find({ isPinned: true }).sort({ [sortBy]: order });

    res.status(200).json({
      success: true,
      message: `Pinned notes sorted by ${sortBy} in ${order === 1 ? "ascending" : "descending"} order`,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
