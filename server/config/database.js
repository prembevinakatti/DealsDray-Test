const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB : " + error.message);
      });
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
};

module.exports = connectDB;
