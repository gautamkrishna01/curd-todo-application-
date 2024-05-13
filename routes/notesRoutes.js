const express = require("express");
const {
  getNotes,
  createNotes,
  deleteNotes,
  updateNotes,
} = require("../controller/noteController");

const noteRoutes = express.Router();

noteRoutes.get("/", getNotes);

noteRoutes.post("/", createNotes);

noteRoutes.delete("/:id", deleteNotes);

noteRoutes.put("/:id", updateNotes);

module.exports = noteRoutes;
