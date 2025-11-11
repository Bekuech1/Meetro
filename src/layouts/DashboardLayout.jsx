import Header from "@/components/home/Header";
import Footer from "@/components/Layout-conponents/Footer";
import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default DashboardLayout;
