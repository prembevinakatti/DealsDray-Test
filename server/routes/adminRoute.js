const express = require("express");
const {
  createAdmin,
  loginAdmin,
  createEmployee,
  getEmployeesList,
  updateEmployee,
  deleteEmployee,
  logoutAdmin,
} = require("../controllers/adminController");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.route("/createAdmin").post(createAdmin);
router.route("/loginAdmin").post(loginAdmin);
router.route("/createEmployee").post(isAdmin, createEmployee);
router.route("/getEmployeesList").get(isAdmin, getEmployeesList);
router.route("/updateEmployee").put(isAdmin, updateEmployee);
router.route("/deleteEmployee/:employeeId").delete(isAdmin, deleteEmployee);
router.route("/logoutAdmin").get(isAdmin, logoutAdmin);

module.exports = router;
