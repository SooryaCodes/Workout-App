const express = require("express");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/userController");

//LOGIN route
router.post("/login", loginUser);

// SIGNUP route
router.post("/signup", signupUser);

module.exports = router;
