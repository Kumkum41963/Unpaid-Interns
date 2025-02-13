const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getCoordinates = require("../utils/getCoordinates");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { lat, lon } = await getCoordinates(address);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      location: { type: "Point", coordinates: [lon, lat] } 
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // process.env.JWT_SECRET
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error logging in" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

module.exports = { registerUser, loginUser, getUserByEmail };