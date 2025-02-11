const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true },
  location: { 
    type: { type: String, enum: ["Point"], default: "Point" }, 
    coordinates: { type: [Number], index: "2dsphere" }
  },
  green_points: { type: Number, default: 0 }
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);