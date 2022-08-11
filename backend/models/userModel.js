const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

/**
 *  Static signup method
 */
userSchema.statics.signup = async function (name, email, password) {
  // Validating name, email & password
  email = email.replace(" ", "");
  password = password.replace(" ", "");

  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Checking whether email exists on the database
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  // Encrypting password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Inserting user details to the database
  const user = await this.create({ name, email, password: hash });

  return user;
};

/**
 *  Static login method
 */
userSchema.statics.login = async function (email, password) {
  // Validating email and password
  email = email.replace(" ", "");
  password = password.replace(" ", "");

  if (!email || !password) throw Error("All fields must be filled");

  // Checking whether user exists in the database
  const user = await this.findOne({ email });

  if (!user) throw Error("Incorrect email");

  // Comparing password value
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect password");

  return user;
};

module.exports = model("User", userSchema);
