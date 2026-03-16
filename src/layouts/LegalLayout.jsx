import Footer from "@/components/event-dashboard/Footer";
import { Outlet } from "react-router";

function LegalLayout() {
  return (
    <div className="scroll-smooth relative">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LegalLayout;
