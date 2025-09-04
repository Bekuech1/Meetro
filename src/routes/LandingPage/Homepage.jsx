import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Layout-conponents/Footer";
import LandingNav from "@/components/LandingPage/LandingNav";
import CreateEventBtn from "@/components/Layout-conponents/CreateEventBtn";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import BlogPage from "./BlogPage";
import AboutUs from "./AboutUs";

function Homepage() {
  const [navOpen, setNavOpen] = useState(false);
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

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navOpen && !event.target.closest('nav')) {
        setNavOpen(false);
      }
    };

    if (navOpen) {
      document.addEventListener('click', handleOutsideClick);
      // Prevent body scroll when nav is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [navOpen]);

  const navItems = [
    { label: "How it Works", index: 0 },
    { label: "Pricing", index: 1 },
    { label: "Blog", index: 2 },
    { label: "About Us", index: 3 }
  ];

  return (
    <div className={`scroll-smooth relative ${navOpen ? "shadow-lg" : ""}`}>
      {navOpen && (
        <nav
          className="fixed inset-0 w-[96%] h-[98vh] bg-[#011F0FE5]/90 backdrop-blur-[100px] pt-3 pb-6 pr-4 pl-6 flex flex-col rounded-4xl justify-between z-[100] m-auto"
          role="navigation"
          aria-label="Mobile navigation"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex flex-col gap-8 h-fit">
            <div className="flex w-full h-fit justify-between">
              <img src="meetroLogo.svg" alt="Meetro Logo" />
              <button
                onClick={() => setNavOpen(false)}
                className="size-fit rounded-4xl p-1 bg-[#344C3F]"
                aria-label="Close navigation menu"
              >
                <img src="/menu-active.svg" alt="" className="size-[24px]" />
              </button>
            </div>
            <ul className="flex flex-col h-fit w-full">
              {navItems.map((item) => (
                <li key={item.index}>
                  <button
                    className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer text-left"
                    onClick={() => handleNavItemClick(item.index)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <CreateEventBtn
            onClick={() => navigate("/authentication")}
            bgcolor="bg-[#AEFC40]"
            text="create event"
            textcolor="text-[#011F0F] py-4 text-base"
          />
        </nav>
      )}

      <div className="top-0 sticky z-20 justify-center items-center flex">
        <LandingNav
          onClick={() => setNavOpen(true)}
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