import TopNavigation from "@/components/Layout-conponents/Navigation/TopNavigation";
import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-dvh bg-[#F0F0F0]">
        <TopNavigation />
        <main className="flex-1 px-4 flex flex-col">
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
