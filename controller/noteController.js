const noteModel = require("../model/note");

const createNotes = async (req, resp) => {
  const { title, description } = req.body;

  const newNotes = new noteModel({
    title: title,
    description: description,
    userId: req.userId,
  });
  try {
    await newNotes.save();
    resp.status(201).json(newNotes);
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const updateNotes = async (req, resp) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const newNotes = {
    title: title,
    description: description,
    userId: req.userId,
  };
  try {
    await noteModel.findByIdAndUpdate(id, newNotes, { new: true });
    resp.status(200).json(newNotes);
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const deleteNotes = async (req, resp) => {
  const id = req.params.id;

  try {
    const note = await noteModel.findByIdAndDelete(id);
    resp
      .status(202)
      .json({ message: "Note deleted successfully", deletedNote: note });
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getNotes = async (req, resp) => {
  try {
    const notes = await noteModel.find({ userId: req.userId });
    resp.status(200).json(notes);
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = {
  createNotes,
  updateNotes,
  deleteNotes,
  getNotes,
};
