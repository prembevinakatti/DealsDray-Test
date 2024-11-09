const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decodedToken) {
      return res.status(401).json({ message: "Something Went Wrong" });
    }

    req.user = decodedToken.role;
    next();
  } catch (error) {
    console.log("Error In Admin Middleware :" + error.message);
  }
};

module.exports = isAdmin;
