const axios = require("axios");
require("dotenv").config();

// Function to fetch latitude & longitude
const getCoordinates = async (state, country) => {
    if (!state || !country) {
        throw new Error("State and country are required");
    }

    const query = `${state}, ${country}`;
    const URL = process.env.LOCATION_API_URL || "https://nominatim.openstreetmap.org/search";

    try {
        const response = await axios.get(URL, {
            params: { q: query, format: "json", addressdetails: 1 },
            headers: { "User-Agent": "server/1.0.0" }
        });

        console.log("API Response from Nominatim:", response.data);

        if (response.data.length > 0) {
            return { latitude: response.data[0].lat, longitude: response.data[0].lon };
        } else {
            throw new Error("Location not found");
        }
    } catch (error) {
        console.error("Error fetching coordinates from Nominatim:", error);
        throw new Error("Internal server error");
    }
};

// Express route handler
const getCoordinatesHandler = async (req, res) => {
    try {
        const { state, country } = req.body;
        const coordinates = await getCoordinates(state, country);
        return res.status(200).json(coordinates);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getCoordinates, getCoordinatesHandler };


// curl -X GET "https://power.larc.nasa.gov/api/temporal/daily/configuration
// Parameter	Meaning
// ALLSKY_SFC_SW_DWN	Total solar irradiance at the surface (most commonly used for solar power calculations)
// CLRSKY_SFC_SW_DWN	Clear-sky solar radiation (ignores cloud effects, useful for theoretical max power output)
// T2M	Temperature at 2 meters above ground (in °C)
// RH2M	Relative humidity at 2 meters (%)
// WS2M	Wind speed at 2 meters (m/s)
// PRECTOTCORR	Total precipitation (mm/day)