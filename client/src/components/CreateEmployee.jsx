import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Button component from ShadCN
import { Input } from "@/components/ui/input"; // Input component from ShadCN
import { Card } from "@/components/ui/card"; // Assuming there's a Card component from ShadCN
import { Label } from "@/components/ui/label"; // Label component from ShadCN
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select"; // Updated Select components for dropdown
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox component for Course
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Radio component for Gender

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

  const handleRadioChange = (value) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      image: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Data:", employeeData);
    // Add logic to send the data to your API or backend
  };

  const designationOptions = ["Developer", "Manager", "Designer", "Tester"];
  const courseOptions = ["React", "Node.js", "Blockchain", "JavaScript"];
  const genderOptions = ["Male", "Female", "Other"];

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-96 p-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Create Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="mb-4">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
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
          <div className="mb-4">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
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
          <div className="mb-4">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</Label>
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

          {/* Designation */}
          <div className="mb-4">
            <Label htmlFor="designation" className="text-sm font-medium text-gray-700">Designation</Label>
            <Select
              value={employeeData.designation}
              onValueChange={(value) => setEmployeeData((prevData) => ({
                ...prevData,
                designation: value,
              }))}
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

          {/* Gender */}
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700">Gender</Label>
            <RadioGroup value={employeeData.gender} onValueChange={handleRadioChange}>
              {genderOptions.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <RadioGroupItem value={gender} id={gender} />
                  <Label htmlFor={gender}>{gender}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Courses */}
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700">Courses</Label>
            <div className="space-x-4">
              {courseOptions.map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox
                    id={course}
                    value={course}
                    checked={employeeData.courses.includes(course)}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor={course} className="text-sm">{course}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="mb-4">
            <Label htmlFor="image" className="text-sm font-medium text-gray-700">Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <Button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Employee
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateEmployee;
