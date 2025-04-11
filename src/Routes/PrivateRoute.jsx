import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../pages/Navbaer";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // ✅ Check if user is logged in

  return token ?
  <>
    <Navbar />
    <Outlet />
  </>
   : <Navigate to="/login" replace />;
};

export default PrivateRoute;