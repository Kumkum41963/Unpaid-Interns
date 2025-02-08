const express = require("express");
const dotenv = require("dotenv");
const analyzeRoutes = require("./routes/analyze");
const cors = require("cors");

// solar routes
const solarRoutes = require("./routes/solarRoutes");

dotenv.config();

const app = express();

const corsOption = {
  origin: "http://localhost:5173/",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOption));
app.use("/analyze", analyzeRoutes);
app.use("/api", solarRoutes);
app.post('/api/submit', (req, res) => {
    const { name } = req.body;
    console.log(`Received data: ${name}`);
    res.json({ message: 'Request was successful!' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
