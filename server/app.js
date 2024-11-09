const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/adminRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

//routes
app.use("/api/v1/dealsdray/admin", adminRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on ${PORT}`);
});
