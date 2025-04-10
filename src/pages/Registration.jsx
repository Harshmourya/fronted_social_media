import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import showToastMessage from "../components/ToastMessage";
import { registerUser } from "../Api/api";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
const inputCss = "w-1/2 p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-300 focus:outline-none hover:scale-105"
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim()});
  };
  const handleRegister = async (e) => {
    e.preventDefault();
  
    const { firstname, lastname, username, email, password, phone } = formData;
  
    // Validate required fields
    if (!firstname || !lastname || !username || !email || !password) {
      showToastMessage("error", "Please fill in all required fields.");
      return;
    }
  
    // Validate phone number
    if (phone && !/^\d{10}$/.test(phone)) {
      showToastMessage("error", "Please enter a valid 10-digit phone number.");
      return;
    }
  
    try {
      console.log("Submitting Data:", formData);
      const response = await registerUser(formData);
      
      console.log("Server Response:", response); // Check response structure
    
      if (response && response.status === 201) {
        showToastMessage("success", "Registration successful! Now verify your OTP.");
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        showToastMessage("error", response?.data?.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration Error:", error); // Debugging logs
      showToastMessage("error", error.response?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <form
        className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-lg shadow-lg shadow-blue-600 p-6 space-y-5 border border-white/20"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-semibold text-white text-center">Register</h2>

        {/* First & Last Name */}
        <div className="flex gap-4">
          <InputBox
            type="text"
            name="firstname"
            placeholder="First Name"
            className={inputCss}
            onChange={handleChange}
            required
          />
          <InputBox
            type="text"
            name="lastname"
            placeholder="Last Name"
            className={inputCss}
            onChange={handleChange}
            required
          />
        </div>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={` w-full ${inputCss}`}
          onChange={handleChange}
          required
        />

        {/* Email & Password */}
        <div className="flex gap-4">
          <InputBox
            type="email"
            name="email"
            placeholder="Email"
            className={inputCss}
            onChange={handleChange}
            required
          />
          <InputBox
            type="password"
            name="password"
            placeholder="Password"
            className={inputCss}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <InputBox
          type="text"
          name="phone"
          placeholder="Phone"
          className={`w-full ${inputCss}`}
          onChange={handleChange}
        />

        {/* Address */}
        <InputBox
          type="text"
          name="address"
          placeholder="Address"
          className={`w-full p-3 ${inputCss}`}
          onChange={handleChange}
        />

        {/* Register Button */}
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
         text =  "Register"
        />

        <div className="w-full flex justify-between text-lg text-white">
        <p className="hover:underline hover:scale-110" >Have an account?</p>
          <Link to="/login"
          className="hover:underline hover:scale-110 focus:text-amber-300"
          > Sign In</Link>
        </div>
      </form>
    </div>
  );
};


export default Register;
