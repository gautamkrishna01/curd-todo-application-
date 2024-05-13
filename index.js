const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const noteRoutes = require("./routes/notesRoutes");

const PORT = 5000;

app.use(express.json());

app.use("/user", userRouter);
app.use("/notes", noteRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/curd")
  .then(() => {
    console.log("database connection established");
    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  })
  .catch(() => {
    console.log("error connecting  while database connection established");
  });
