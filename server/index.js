const express = require("express");
const dotenv = require("dotenv");
const analyzeRoutes = require("./routes/analyze");

// solar routes
const solarRoutes=require('./routes/solarRoutes')

dotenv.config();

const app = express();
app.use(express.json());
app.use("/analyze", analyzeRoutes);
app.use("/api", solarRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
