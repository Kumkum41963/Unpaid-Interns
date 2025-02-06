const express = require("express");
const router = express.Router();
const { getSolarIrradiance } = require("../controller/solarIrradianceController");

// POST route to fetch solar irradiance data based on latitude and longitude
router.post("/getIrradiance", getSolarIrradiance);

module.exports = router;
