const express = require("express");
const { registerVendor, getVendorByPhone, loginVendor } = require("../controller/vendor");

const router = express.Router();

router.post("/register", registerVendor);
router.post("/login", loginVendor);
router.get("/:phone", getVendorByPhone);

module.exports = router;