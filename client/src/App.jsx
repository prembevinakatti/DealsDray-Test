import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import { Outlet } from "react-router-dom";
function Layout({ username, onLogout }) {
  return (
    <div>
      <Navbar username={username} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState("John Doe");

  const handleLogout = () => {
    console.log("Logged out!");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout username={username} onLogout={handleLogout} />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/employeeList",
          element: <EmployeeList />,
        },
        {
          path: "/createEmployee",
          element: <CreateEmployee />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
