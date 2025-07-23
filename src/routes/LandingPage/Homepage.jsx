import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
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

  const renderContent = () => {
    switch (activeItem) {
      case 0:
        return <HowItWorks onClick={handleCardClick} />;
      case 1:
        return <Pricing />;
      case 2:
        return <BlogPage onClick={handleCardClick} />;
      case 3:
        return <AboutUs />;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // Use useEffect to scroll to top whenever activeItem changes
  useEffect(() => {
    scrollToTop();
  }, [activeItem]);

  const navigate = useNavigate();

  const handleCardClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <>
      <div className={`scroll-smooth relative ${navOpen ? " shadow-lg" : ""}`}>
        {navOpen && (
          <nav
            className="fixed inset-0 w-[96%] h-[98vh] bg-[#011F0FE5]/90 backdrop-blur-[100px] pt-3 pb-6 pr-4 pl-6 flex flex-col rounded-4xl justify-between z-[100] m-auto"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="w-full flex flex-col gap-8 h-fit">
              <div className="flex w-full h-fit justify-between">
                <img src="meetroLogo.svg" alt="" />
                <button
                  onClick={() => setNavOpen(false)}
                  className="size-fit rounded-4xl p-1 bg-[#344C3F]"
                >
                  <img src="/menu-active.svg" alt="" className="size-[24px]" />
                </button>
              </div>
              <ul className="flex flex-col h-fit w-full">
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => {
                    setActiveItem(0);
                    setNavOpen(false);
                  }}
                >
                  How it Works
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => {
                    setActiveItem(1);
                    setNavOpen(false);
                  }}
                >
                  Pricing
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => {
                    setActiveItem(2);
                    setNavOpen(false);
                  }}
                >
                  Blog
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => {
                    setActiveItem(3);
                    setNavOpen(false);
                  }}
                >
                  About Us
                </li>
              </ul>
            </div>{" "}
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
    </>
  );
}

export default Homepage;
