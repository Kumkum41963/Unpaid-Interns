const express = require("express");
const { registerUser, loginUser, getUserByEmail } = require("../controller/user");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:email", getUserByEmail);

module.exports = router;