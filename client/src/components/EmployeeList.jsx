import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // ShadCN Table components
import { Input } from "@/components/ui/input"; // Input component
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // ShadCN Dialog components
import { Button } from "@/components/ui/button"; // Button component
import useGetAllEmployeesList from "@/hooks/useGetAllEmployeesList"; // Hook to get employees list
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const employees = useGetAllEmployeesList();
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState(null);
  const navigate = useNavigate();

  // Designation options (dropdown)
  const designationOptions = ["HR", "Manager", "Sales"];
  // Course options (checkboxes)
  const courseOptions = ["MCA", "BCA", "BSC"];
  // Gender options (radio buttons)
  const genderOptions = ["male", "female"];

  // Filtered employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee?.name?.toLowerCase().includes(search?.toLowerCase()) ||
      employee?.position?.toLowerCase().includes(search?.toLowerCase())
  );

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedEmployee({
      ...employee,
      courses: employee.courses || [], // Ensure it's an array, even if empty
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (employeeId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/dealsdray/admin/deleteEmployee/${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Successfully deleted employee", res.data);
      toast.success(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log("Error deleting employee :", error);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/dealsdray/admin/updateEmployee`,
        updatedEmployee,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("updateEmployee error :", error);
    }

    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setUpdatedEmployee((prevData) => {
      const updatedCourses = checked
        ? [...prevData.courses, value] // Use spread operator to add the course
        : prevData.courses.filter((course) => course !== value); // Remove course if unchecked

      return { ...prevData, courses: updatedCourses };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-screen p-6 py-28">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or position"
          className="w-1/3"
        />
        <span>Total Employees: {filteredEmployees.length}</span>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile No</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.userId}>
              <TableCell>{employee.userId}</TableCell>
              <TableCell>
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full"
                />
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phoneNumber}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.courses.join(",")}</TableCell>
              <TableCell>
                {new Date(employee.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-600 text-white"
                    onClick={() => handleDeleteClick(employee._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Edit Modal */}
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update the employee details below.
            </DialogDescription>
          </DialogHeader>

          {/* Edit Form */}
          <div className="p-4 space-y-4">
            {selectedEmployee && (
              <div>
                <div className="mb-2">
                  <label className="block font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedEmployee.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedEmployee.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-semibold">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={updatedEmployee.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-semibold">Designation</label>
                  <select
                    name="designation"
                    value={updatedEmployee.designation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    {designationOptions.map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block font-semibold">Gender</label>
                  <div className="flex items-center gap-3">
                    {genderOptions.map((gender) => (
                      <div key={gender}>
                        <input
                          type="radio"
                          className="cursor-pointer"
                          name="gender"
                          value={gender}
                          checked={updatedEmployee.gender === gender}
                          onChange={handleRadioChange}
                        />
                        <label> {gender}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block font-semibold">Course</label>
                  <div className="flex items-center gap-3">
                    {courseOptions.map((course) => (
                      <div key={course}>
                        <input
                          className="cursor-pointer"
                          type="checkbox"
                          name="course"
                          value={course}
                          checked={updatedEmployee.courses.includes(course)}
                          onChange={handleCheckboxChange}
                        />
                        <label> {course}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block font-semibold">Image</label>
                  <input
                    type="file"
                    name="image"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-2">
                  <label className="block font-semibold">Active</label>
                  <div className="flex items-center gap-3">
                    <div>
                      <input
                        type="radio"
                        name="active"
                        value="true"
                        className="cursor-pointer"
                        checked={updatedEmployee.active === true}
                        onChange={() =>
                          setUpdatedEmployee((prevData) => ({
                            ...prevData,
                            active: true,
                          }))
                        }
                      />
                      <label> Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="active"
                        value="false"
                        className="cursor-pointer"
                        checked={updatedEmployee.active === false}
                        onChange={() =>
                          setUpdatedEmployee((prevData) => ({
                            ...prevData,
                            active: false,
                          }))
                        }
                      />
                      <label> No</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between w-full p-4">
            <Button
              className="bg-gray-600 text-white"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 text-white" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
