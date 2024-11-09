const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/adminRoute");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/v1/dealsdray/admin", adminRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on ${PORT}`);
});
