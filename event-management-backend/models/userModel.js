const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "attendee"], // User roles
      default: "attendee",
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);
module.exports = User;
