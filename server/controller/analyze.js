const axios = require("axios");

const analyzeImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No image uploaded" });

        const apiKey = process.env.IMAGGA_API_KEY;
        const apiSecret = process.env.IMAGGA_API_SECRET;
        const imageBuffer = req.file.buffer.toString("base64");

        const response = await axios.post(
            "https://api.imagga.com/v2/tags",
            `image_base64=${encodeURIComponent(imageBuffer)}`,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                auth: { username: apiKey, password: apiSecret },
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error processing image" });
    }
};

module.exports = { analyzeImage };
