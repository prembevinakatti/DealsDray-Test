import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/redux/authSlice";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/dealsdray/admin/loginAdmin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setAdmin(response.data.admin));
        console.log(response.data);

        navigate("/home");
      } else {
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }

    setData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-white">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="w-full text-center">
            <Button
              type="submit"
              className="px-10"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin w-6 h-6 border-4 border-t-4 border-white rounded-full"></div>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
