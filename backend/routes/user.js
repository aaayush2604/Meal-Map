const express = require("express");
const { loginUser, signUpUser } = require("../controllers/userController.js");
const router = express.Router();

//Login Route
router.post("/login", loginUser);

//SignUp Route
router.post("/signup", signUpUser);

module.exports = router;
