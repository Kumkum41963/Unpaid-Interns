const express = require("express");
const { calculateElectricityUsage } = require("../controllers/electricityController");

const router = express.Router();

router.post("/electricityUsage", calculateElectricityUsage);

module.exports = router;
