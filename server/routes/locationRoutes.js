const express = require("express");
const router = express.Router();
const { getCoordinates } = require('../controller/locationController');

// Define the POST route for fetching coordinates based on state and country
router.post("/getCoordinates", getCoordinates);

module.exports = router;
