const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone_number: {
      type: "number",
      required: true,
      unique: true,
    },
    profileCompleted: {
      type: "boolean",
      default: false,
    },
    otp: {
      type: "string",
      default: "null",
    },
    otpDateTime: {
      type: "string",
      default: "null",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
