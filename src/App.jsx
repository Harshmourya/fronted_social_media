import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import LoginWithOTP from "../src/pages/LoginWithOTP";
import PrivateRoute from "./Routes/PrivateRoute";
import UploadPost from "./pages/UploadPost";
import Home from "./pages/Home";
import Comment from "./components/Comment";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>

        <Route element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="/createPost" element={<UploadPost />} />
        </Route>

        {/* Public Routes (Accessible to Everyone) */}
        <Route path="/comment" element={<Comment />} />
        <Route path="signup" element={<Registration />} />
        <Route path="verify-otp" element={<LoginWithOTP />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;