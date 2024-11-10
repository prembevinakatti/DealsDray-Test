import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component is already available
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "@/redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [activeButton, setActiveButton] = useState("/"); // Default active button is the home button
  const { authUser } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Function to handle the navigation
  const handleNavigation = (path) => {
    setActiveButton(path); // Set the clicked button as active
    navigate(path); // Navigate to the selected path
  };

  const onLogout = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/dealsdray/admin/logoutAdmin`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAdmin(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error While Logging Out", error);
    }
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

        {authUser && (
          <>
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
              {authUser && (
                <span className="text-sm">Hello, {authUser?.username}</span>
              )}

              <Button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
