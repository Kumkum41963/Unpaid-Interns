const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerVendor = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({ name, phone, password: hashedPassword });
    await vendor.save();
    res.status(201).json({ message: "Vendor registered successfully", vendor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const loginVendor = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const vendor = await Vendor.findOne({ phone });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

const getVendorByPhone = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ phone: req.params.phone }).select("-password");
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendor" });
  }
};

module.exports = { registerVendor, loginVendor, getVendorByPhone };