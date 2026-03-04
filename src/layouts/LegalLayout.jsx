import Footer from "@/components/event-dashboard/Footer";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import { ArrowLeft2 } from "iconsax-reactjs";
import { Outlet } from "react-router";


function LegalLayout() {
    return (
        <div className="scroll-smooth relative">
            <main>
                <Outlet />
            </main>
            <Footer />
        </div >
    );
}

export default LegalLayout;