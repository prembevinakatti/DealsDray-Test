import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Loader component (Simple Spinner)
const Loader = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
  </div>
);

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    courses: [],
    gender: "",
    image: null,
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(""); // Added error message state
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEmployeeData((prevData) => {
      const updatedCourses = checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value);

      return { ...prevData, courses: updatedCourses };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "DealsDray-Test");
      formData.append("cloud_name", "dyp7pxrli");

      setLoading(true); // Set loading to true when uploading
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dyp7pxrli/image/upload",
          formData
        );

        setEmployeeData((prevData) => ({
          ...prevData,
          image: response.data.secure_url,
        }));
      } catch (error) {
        setErrorMessage("Error uploading image."); // Handle file upload errors
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false); // Set loading to false after upload
      }
    }
  };

  const designationOptions = ["HR", "Manager", "Sales"];
  const courseOptions = ["MCA", "BCA", "BSC"];
  const genderOptions = ["male", "female"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employeeData.name ||
      !employeeData.email ||
      !employeeData.phoneNumber
    ) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    setLoading(true); // Set loading to true when submitting the form
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/dealsdray/admin/createEmployee`,
        employeeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/employeeList");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error creating employee: ", error);
      setErrorMessage("Error creating employee.");
    } finally {
      setLoading(false); // Set loading to false after submitting
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[600px] p-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          Create Employee
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1 space-y-4">
            {/* Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={employeeData.name}
                onChange={handleInputChange}
                required
                className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={employeeData.email}
                onChange={handleInputChange}
                required
                className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={employeeData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <Label className="text-sm font-semibold">Gender</Label>
              <div className="flex items-center gap-3 mt-2">
                {genderOptions.map((gender) => (
                  <div key={gender} className="flex items-center gap-1">
                    <input
                      type="radio"
                      className="cursor-pointer"
                      name="gender"
                      value={gender}
                      checked={employeeData.gender === gender}
                      onChange={(e) =>
                        setEmployeeData((prevData) => ({
                          ...prevData,
                          gender: e.target.value,
                        }))
                      }
                    />
                    <label>{gender}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 space-y-4">
            {/* Designation */}
            <div>
              <Label
                htmlFor="designation"
                className="text-sm font-semibold text-gray-700"
              >
                Designation
              </Label>
              <Select
                value={employeeData.designation}
                onValueChange={(value) =>
                  setEmployeeData((prevData) => ({
                    ...prevData,
                    designation: value,
                  }))
                }
              >
                <SelectTrigger className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select a designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Designations</SelectLabel>
                    {designationOptions.map((designation) => (
                      <SelectItem key={designation} value={designation}>
                        {designation}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Courses */}
            <div>
              <Label className="text-sm font-semibold">Courses</Label>
              <div className="flex items-center gap-3 mt-2">
                {courseOptions.map((course) => (
                  <div key={course} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      value={course}
                      checked={employeeData.courses.includes(course)}
                      onChange={handleCheckboxChange}
                    />
                    <label>{course}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div>
              <Label className="text-sm font-semibold">Image</Label>
              <input
                type="file"
                name="image"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <Button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? <Loader /> : "Create Employee"}
            </Button>
          </div>
        </form>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {errorMessage}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CreateEmployee;
