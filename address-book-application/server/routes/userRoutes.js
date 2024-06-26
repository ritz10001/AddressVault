const express = require("express");

const router = express.Router();

const {registerUser, loginUser} = require("../controllers/userController");
//USER REGISTRATION ROUTE
router.route("/register").post(registerUser);

//USER LOGIN ROUTE
router.route("/login").post(loginUser);

module.exports = router;