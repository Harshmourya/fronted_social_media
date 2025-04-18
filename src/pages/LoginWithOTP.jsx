import { useState } from "react";
import { useNavigate } from "react-router-dom";
import showToastMessage from "../components/ToastMessage";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const OTPVerification = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    if(!email || !otp){
      showToastMessage('error' , "Please Fill out Fields")
    }
    
    if(loading) return
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/student/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        showToastMessage('success' , `${data.msg}`);
        navigate("/login");
      } else {
        showToastMessage("error" , `❌ ${data.msg}`);
      }
    } catch (error) {
      showToastMessage("error","❌ Server Error");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg shadow-lg shadow-violet-600 p-6 space-y-5 border border-white/20 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white">OTP Verification</h2>

        <InputBox
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-300 focus:outline-none hover:scale-105"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputBox
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-300 focus:outline-none hover:scale-105"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <Button
          loading={loading}
          onclick={handleVerify}
          className="w-full bg-violet-600 text-white p-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          text={loading ? "Verifing otp": "Verify OTP"}
        />
      </div>
    </div>
  );
};

export default OTPVerification;
