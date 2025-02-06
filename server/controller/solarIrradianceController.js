const axios = require("axios");
require("dotenv").config();
const { getCoordinates } = require("./locationController");

// Function to get solar irradiance based on state & country (Automatically gets lat/lon)
const getSolarIrradiance = async (req, res) => {
    try {
        const { state, country } = req.body;

        if (!state || !country) {
            return res.status(400).json({ error: "State and country are required" });
        }

        // Step 1: Get Latitude & Longitude
        const { latitude, longitude } = await getCoordinates(state, country);

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Step 2: Calculate Date Range (Last Full Month)
        const today = new Date();
        const previousMonth = today.getMonth();
        const year = today.getFullYear();
        const startDate = new Date(year, previousMonth, 1);
        const endDate = new Date(year, previousMonth + 1, 0);

        // Format dates as YYYYMMDD
        const startFormatted = startDate.toISOString().split("T")[0].replace(/-/g, "");
        const endFormatted = endDate.toISOString().split("T")[0].replace(/-/g, "");

        console.log(`Fetching NASA data from ${startFormatted} to ${endFormatted}`);

        // Step 3: Fetch Solar Irradiance Data
        const URL = process.env.SOLAR_IRRADIANCE_URL || "https://power.larc.nasa.gov/api/temporal/daily/point?";
        const irradianceResponse = await axios.get(URL, {
            params: {
                parameters: "ALLSKY_SFC_SW_DWN",
                community: "RE",
                latitude,
                longitude,
                start: startFormatted,
                end: endFormatted,
                format: "JSON",
            },
        });

        console.log("NASA POWER API Response:", irradianceResponse.data);

        // Step 4: Extract Solar Irradiance Data
        if (irradianceResponse.data && irradianceResponse.data.properties && irradianceResponse.data.properties.parameter) {
            const irradianceValues = irradianceResponse.data.properties.parameter.ALLSKY_SFC_SW_DWN;

            console.log("Solar Irradiance Data:", irradianceValues);

            // Step 5: Return Combined Response
            return res.status(200).json({
                latitude,
                longitude,
                solar_irradiance: irradianceValues,
            });
        } else {
            return res.status(404).json({ error: "No solar irradiance data found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getSolarIrradiance };
