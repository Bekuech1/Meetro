import LandingNav from "@/components/landing-page/LandingNav";
import AuthModal from "@/components/authentication/AuthModal";
import Footer from "@/components/layout-components/Footer";
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
      <AuthModal onSuccess={() => navigate("/home")} />
    </div>
  );
}

export default MainLayout;
