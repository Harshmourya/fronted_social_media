import React from "react";


import { Outlet } from "react-router";
import Navbar from "./components/Navbaer";

export default function Layout(){
  return(
    <>
    {/* <Navbar /> */}
    <Outlet />
    {/* <Footer /> */}
    </>
  )
};
