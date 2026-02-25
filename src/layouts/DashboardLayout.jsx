import TopNavigation from "@/components/event-dashboard/TopNavigation";
import React from "react";
import VerifyEmailModal from "@/components/authentication/VerifyEmailModal";
import Footer from "@/components/event-dashboard/Footer";
import { useWelcomeUser } from "@/hooks/useWelcomeUser";
import { Outlet } from "react-router";
import { useChangelog } from "@/hooks/useChangeLog";
import { useShowVerifyEmailBox } from "@/hooks/useShowVerifyEmailBox";

const DashboardLayout = ({ children: customNavigation }) => {
  useShowVerifyEmailBox();
  useWelcomeUser();
  useChangelog();
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-dvh bg-[#F0F0F0]">
        {customNavigation ? customNavigation : <TopNavigation />}
        <main className="flex-1 px-4 flex flex-col">
          <Outlet />
        </main>
        <Footer />
        <VerifyEmailModal />
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
