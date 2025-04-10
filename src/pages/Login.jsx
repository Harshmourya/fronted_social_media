import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import showTostMessage from "../components/ToastMessage";
import { loginUser } from "../Api/api";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputCss =
    "w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-300 focus:outline-none hover:scale-105";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showTostMessage("error", "Please Fill out Fields"); // Show toast message
      return; // Stop function execution if fields are empty
    }
    try {
      console.log("Logging in with:", formData); // ✅ Debug formData
      const response = await loginUser(formData);

      const data = await response.data;
      console.log("Server Response:", data); // ✅ Debug response

      if (response.status === 200) {
        localStorage.setItem("token", data.token); // ✅ Save token
        // console.log(localStorage.getItem("token"));

        showTostMessage("success", "Login Successful");
        navigate("/");
      } else {
        showTostMessage("error", "Username or Password not matching");
      }
    } catch (error) {
      console.error("Login Error:", error);
      showTostMessage("error", "Something Went Wrong!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-black p-6">
        <form
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg shadow-lg shadow-blue-500 p-6 space-y-5 border border-white/20"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-semibold text-white text-center">
            Login
          </h2>

          <InputBox
            type="email"
            placeholder="email"
            name="email"
            className={inputCss}
            onChange={handleChange}
            required={true}
          />

          <InputBox
            type="password"
            placeholder="password"
            name="password"
            className={inputCss}
            onChange={handleChange}
            required={true}
          />

          {/* <button
            type="submit"
            className="w-full bg-blue-600 p-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Login
          </button> */}
          <Button
            type="submit"
            className="w-full bg-blue-600 p-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            text="Login"
          />

          <div className="w-full flex justify-between text-lg text-white">
            <p className="hover:underline hover:scale-110">
              Create New Account
            </p>
            <Link
              to="/signup"
              className="hover:underline hover:scale-110 focus:text-amber-300"
            >
              {" "}
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
