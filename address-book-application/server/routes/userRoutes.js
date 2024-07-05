const express = require("express");
const router = express.Router();
const {registerUser, loginUser, currentUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
//USER REGISTRATION ROUTE
router.post("/register", registerUser);

//USER LOGIN ROUTE
router.post("/login", loginUser);

//CURRENT USER ROUTE
router.get("/current", validateToken, currentUser);

module.exports = router;