import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({ username, onLogout }) {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const { authUser } = useSelector((store) => store.admin);

  const handleLogout = () => {
    console.log("Logged out!");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/home",
          element: authUser ? <Home /> : <Login />,
        },
        {
          path: "/employeeList",
          element: authUser ? <EmployeeList /> : <Login />,
        },
        {
          path: "/createEmployee",
          element: authUser ? <CreateEmployee /> : <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
