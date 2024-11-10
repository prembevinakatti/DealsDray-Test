const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const employeeModel = require("../models/employeeModel");
const { v4: uuidv4 } = require("uuid");

const generateFourDigitUUID = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports.createAdmin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const user = await adminModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newAdmin = await adminModel.create({
      username,
      password,
      role,
    });

    return res
      .status(200)
      .json({ message: "admin created successfully.", newAdmin });
  } catch (error) {
    console.log("Error creating admin : " + error.message);
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const admin = await adminModel.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { username: admin.username, role: admin.role },
      process.env.JWT_TOKEN
    );
    res.cookie("token", token);

    return res
      .status(200)
      .json({ message: "Admin logged in successfully.", success: true, admin });
  } catch (error) {
    console.log("Error Login Admin : " + error.message);
  }
};

module.exports.logoutAdmin = async (req, res) => {
  try {
    const admin = req.user;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    res.clearCookie("token");

    return res
      .status(200)
      .json({ message: "Admin logged out successfully.", success: true });
  } catch (error) {
    console.log("Error logging out : " + error.message);
  }
};

module.exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phoneNumber, designation, gender, courses, image } =
      req.body;

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !designation ||
      !gender ||
      !courses ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingEmployee = await employeeModel.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists." });
    }

    const userId = generateFourDigitUUID();

    if (!userId) {
      return res.status(400).json({ message: "Failed to generate userId." });
    }

    const newEmployee = await employeeModel.create({
      userId,
      name,
      email,
      phoneNumber,
      designation,
      gender,
      courses,
      image,
    });

    return res.status(200).json({
      message: "Employee created successfully.",
      success: true,
      newEmployee,
    });
  } catch (error) {
    console.log("Error creating employee in server: " + error.message);
  }
};

module.exports.getEmployeesList = async (req, res) => {
  try {
    const admin = req.user;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const employees = await employeeModel.find();

    if (!employees) {
      return res.status(404).json({ message: "No employees found." });
    }

    return res.status(200).json({
      message: "Successfullt retrived Employees List",
      success: true,
      employees,
    });
  } catch (error) {
    console.log("Error Getting Employees List :", error.message);
  }
};

module.exports.updateEmployee = async (req, res) => {
  try {
    const {
      userId,
      active,
      name,
      email,
      phoneNumber,
      designation,
      gender,
      course,
      image,
    } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required to update the employee." });
    }

    const existingEmployee = await employeeModel.findOne({ userId });

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const updateFields = {};

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (designation) updateFields.designation = designation;
    if (gender) updateFields.gender = gender;
    if (course) updateFields.course = course;
    if (image) updateFields.image = image;
    if (typeof active === "boolean") updateFields.active = active;

    const updatedEmployee = await employeeModel.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Employee details updated successfully.",
      success: true,
      updatedEmployee,
    });
  } catch (error) {
    console.log("Error updating employee: " + error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    const admin = req.user;
    const employeeId = req.params.employeeId;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    if (!employeeId) {
      return res
        .status(400)
        .json({ message: "Employee ID is required to delete the employee." });
    }

    const employee = await employeeModel.findByIdAndDelete(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    return res
      .status(200)
      .json({ message: "Employee deleted successfully.", success: true });
  } catch (error) {
    console.log("Error deleting employee in server: " + error.message);
  }
};
