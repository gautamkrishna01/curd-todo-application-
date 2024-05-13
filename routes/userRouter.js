const express = require("express");
const { signIn, signUp } = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/signup", signUp);

userRouter.post("/signin", signIn);

module.exports = userRouter;
