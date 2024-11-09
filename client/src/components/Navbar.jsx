import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component is already available
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

const Navbar = ({ username, onLogout }) => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [activeButton, setActiveButton] = useState("/"); // Default active button is the home button

  // Function to handle the navigation
  const handleNavigation = (path) => {
    setActiveButton(path); // Set the clicked button as active
    navigate(path); // Navigate to the selected path
  };

  return (
    <div className="fixed w-full bg-white text-black border-b p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          MyLogo
        </div>

        {/* Left Navigation Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={() => handleNavigation("/home")}
            className={`${
              activeButton === "/home"
                ? "bg-black text-white"
                : "border-black hover:text-white bg-transparent text-black"
            } border px-4 py-2 rounded-md`}
          >
            Home
          </Button>
          <Button
            onClick={() => handleNavigation("/employeeList")}
            className={`${
              activeButton === "/employeeList"
                ? "bg-black text-white"
                : "border-black hover:text-white bg-transparent text-black"
            } border px-4 py-2 rounded-md`}
          >
            Employee List
          </Button>
          <Button
            onClick={() => handleNavigation("/createEmployee")}
            className={`${
              activeButton === "/createEmployee"
                ? "bg-black text-white"
                : "border-black hover:text-white bg-transparent text-black"
            } border px-4 py-2 rounded-md`}
          >
            Create Employee
          </Button>
        </div>

        {/* Right Side (Username and Logout button) */}
        <div className="flex items-center space-x-4">
          {username && <span className="text-sm">Hello, {username}</span>}

          <Button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
