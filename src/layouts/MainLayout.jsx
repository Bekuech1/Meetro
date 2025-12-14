import LandingNav from "@/components/LandingPage/LandingNav";
import AuthModal from "@/components/Layout-conponents/Authentication/AuthModal";
import Footer from "@/components/Layout-conponents/Footer";
import { Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  return (
    <div className="scroll-smooth relative">
      <div className="justify-center items-center flex">
        <LandingNav />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthModal onSuccess={() => navigate("/create-event")} />
    </div>
  );
}

export default MainLayout;
