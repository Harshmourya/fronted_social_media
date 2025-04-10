import React from "react";


import { Outlet } from "react-router";
import Navbar from "./pages/Navbaer";

export default function Layout(){
  return(
    <>
    {/* <Navbar /> */}
    <Outlet />
    {/* <Footer /> */}
    </>
  )
};
