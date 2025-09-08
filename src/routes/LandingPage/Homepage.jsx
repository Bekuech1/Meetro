import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Layout-conponents/Footer";
import LandingNav from "@/components/LandingPage/LandingNav";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import BlogPage from "./BlogPage";
import AboutUs from "./AboutUs";

function Homepage() {
  
  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  const handleNavItemClick = (itemIndex) => {
    setActiveItem(itemIndex);
    setNavOpen(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 0:
        return (
          <HowItWorks
            onClick={handleCardClick}
            goToBlog={() => setActiveItem(2)}
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
            onClick={handleCardClick}
            goToBlog={() => setActiveItem(2)}
          />
        );
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // Scroll to top whenever activeItem changes
  useEffect(() => {
    scrollToTop();
  }, [activeItem]);


  const navItems = [
    { label: "How it Works", index: 0 },
    { label: "Pricing", index: 1 },
    { label: "Blog", index: 2 },
    { label: "About Us", index: 3 }
  ];

  return (
    <div className='scroll-smooth relative'>

      <div className="top-0 sticky z-20 justify-center items-center flex">
        <LandingNav
          onAuth={() => navigate("/authentication")}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
        />
      </div>
      
      <main>{renderContent()}</main>
      
      <Footer />
    </div>
  );
}

export default Homepage;