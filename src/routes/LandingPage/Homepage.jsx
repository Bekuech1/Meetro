import LandingNav from "@/components/LandingPage/LandingNav";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import Footer from "../../components/Layout-conponents/Footer";
import AboutUs from "./AboutUs";
import BlogPage from "./BlogPage";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import ListInput from "@/components/Layout-conponents/Inputs/ListInput";
import FormGroup from "@/components/Layout-conponents/Inputs/FormGroup";

function Homepage() {
  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    postId => {
      navigate(`/blog/${postId}`);
    },
    [navigate]
  );

  // Removed unused buggy handler referencing undefined setNavOpen

  const goToAuth = useCallback(() => navigate("/authentication"), [navigate]);
  const goToBlogTab = useCallback(() => setActiveItem(2), []);

  const content = useMemo(() => {
    switch (activeItem) {
      case 0:
        return (
          <HowItWorks
            openBlog={handleCardClick}
            goToBlog={goToBlogTab}
            onClick={goToAuth}
          />
        );
      case 1:
        return <Pricing />;
      case 2:
        return <BlogPage onClick={handleCardClick} />;
      case 3:
        return <AboutUs />;
      default:
        return (
          <HowItWorks
            onClick={goToAuth}
            goToBlog={goToBlogTab}
            openBlog={handleCardClick}
          />
        );
    }
  }, [activeItem, handleCardClick, goToAuth, goToBlogTab]);

  // Scroll to top whenever activeItem changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeItem]);

  // (navItems removed; not used here)

  return (
    <div className="scroll-smooth relative">
      <div className="top-0 sticky z-20 justify-center items-center flex">
        <LandingNav
          onAuth={goToAuth}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
        />
      </div>
      <main>{content}</main>
      <Footer />
    </div>
  );
}

export default Homepage;
