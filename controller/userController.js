const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const SECRET_KEY = "NOTEAPI";

const signUp = async (req, resp) => {
  // Existing User Check
  // Hashed Password
  // User Creation
  // Token Generate

  const { userName, password, email } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return resp.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      userName: userName,
      password: hashedPassword,
      email: email,
    });

    const token = jsonWebToken.sign(
      { email: result.email, id: result._id },
      SECRET_KEY
    );
    resp.status(200).json({ user: result, token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something went wrong" });
  }
};

const signIn = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return resp.status(400).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    console.log(password, matchPassword);

    if (!matchPassword) {
      return resp.status(400).json({ message: "Invalid credentials" });
    }
    const token = jsonWebToken.sign(
      { email: result.email, id: result._id },
      SECRET_KEY
    );
    resp.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signIn, signUp };
