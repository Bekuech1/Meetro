import LandingNav from "@/components/LandingPage/LandingNav";
import Footer from "@/components/Layout-conponents/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="scroll-smooth relative">
      <div className="justify-center items-center flex">
        <LandingNav />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
