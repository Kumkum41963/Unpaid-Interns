const express = require("express");
const dotenv = require("dotenv");
const analyzeRoutes = require("./routes/analyze");
const locationRoutes=require('./routes/locationRoutes')
const solarIrradianceRoutes=require('./routes/solarIrradianceRoutes')

dotenv.config();

const app = express();
app.use(express.json());
app.use("/analyze", analyzeRoutes);
app.use("/api/location", locationRoutes); // Routes for getting lat/lon
app.use("/api/solar", solarIrradianceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
