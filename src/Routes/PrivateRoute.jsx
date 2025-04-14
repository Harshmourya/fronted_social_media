import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbaer";
import { useEffect, useState } from "react";
import showToastMessage from "../components/ToastMessage";

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const token = localStorage.getItem("token"); // ✅ Check if user is logged in
  useEffect(() => {
    setIsLoggedIn(!!token);

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    showToastMessage('success', 'Logout Successefully')
  };

  return token ?
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Outlet />
    </>
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;