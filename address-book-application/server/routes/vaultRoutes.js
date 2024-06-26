const express = require("express");
const { getAddresses, getAddressById, createAddress, updateAddress, deleteAddress } = require("../controllers/vaultController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();
router.use(validateToken);

//GET ROUTE
router.route("/").get(getAddresses);

//GET ADDRESS BY ID ROUTE
router.route("/:id").get(getAddressById);

//CREATE ADDRESS ROUTE
router.route("/").post(createAddress);

//UPDATE ADDRESS
router.route("/:id").put(updateAddress);

//DELETE ADDRESS    
router.route("/:id").delete(deleteAddress);

module.exports = router;