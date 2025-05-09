import React from "react";
import HeaderPage from "./HeaderPage";
import AboutUs from "./AboutUs";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <HeaderPage />
      <main style={{ minHeight: "100vh", scrollBehavior: "smooth" }}>
        <Outlet />
      </main>
      <AboutUs />
    </>
  );
};

export default Layout;
