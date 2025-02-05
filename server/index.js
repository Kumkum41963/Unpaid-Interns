const express = require("express");
const dotenv = require("dotenv");
const analyzeRoutes = require("./routes/analyze");

dotenv.config();

const app = express();
app.use("/analyze", analyzeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
