import LandingNav from "@/components/LandingPage/LandingNav";
import LoginModal from "@/components/Layout-conponents/Authentication/LoginModal";
import SignUpModal from "@/components/Layout-conponents/Authentication/SignUpModal";
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
      <LoginModal onSuccess={() => navigate("/create-event")} />
      <SignUpModal />
    </div>
  );
}

export default MainLayout;
