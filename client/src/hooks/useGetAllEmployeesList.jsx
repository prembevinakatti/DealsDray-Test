import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllEmployeesList = () => {
  const [employeesList, setEmployeesList] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/dealsdray/admin/getEmployeesList`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setEmployeesList(response.data.employees);
        console.log(response.data.employees);
      } catch (error) {
        console.log("Error fetching employees list : " + error.message);
      }
    };
    fetchEmployees();
  }, []);

  return employeesList;
};

export default useGetAllEmployeesList;
