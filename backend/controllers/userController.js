const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });

/**
 * Login user
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // Creating token
    const token = createToken(user._id);

    res.status(200).json({ name: user.name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Signup user
 */
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    // Creatingtoken
    const token = createToken(user._id);

    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
