const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      default: "",
      enum: ["HR", "Manager", "Sales"],
      required: true,
    },
    gender: {
      type: String,
      default: "",
      enum: ["male", "female"],
      required: true,
    },
    course: {
      type: String,
      required: true,
      enum: ["MCA", "BCA", "BSC"],
    },
    image: {
      type: String,
      default: "default.jpg",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
