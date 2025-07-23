import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNav from "@/components/LandingPage/LandingNav";
import CreateEventBtn from "@/components/Layout-conponents/CreateEventBtn";

const NavigationWrapper = ({ 
  children, 
  activeItem = 0, 
  setActiveItem = null, 
  showFooter = false,
  Footer = null 
}) => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  // Handle navigation for different contexts
  const handleNavigation = (itemIndex) => {
    setNavOpen(false);
    if (setActiveItem) {
      // We're on homepage - use setActiveItem
      setActiveItem(itemIndex);
    } else {
      // We're on blog post - navigate to homepage with state
      navigate("/", { state: { id: itemIndex } });
    }
  };

  return (
    <div className={`scroll-smooth relative ${navOpen ? "shadow-lg" : ""} relative`}>
      {/* Mobile Navigation Overlay */}
      {navOpen && (
        <nav className="w-full h-screen flex justify-center items-center z-110 absolute">
          <div className="w-[98%] h-[98%] bg-[#011F0FE5]/90 backdrop-blur-[100px] pt-3 pb-6 pr-4 pl-6 flex flex-col rounded-4xl justify-between">
            <div className="w-full flex flex-col gap-8 h-fit">
              <div className="flex w-full h-fit justify-between">
                <img src="/meetroLogo.svg" alt="Meetro Logo" />
                <button
                  onClick={() => setNavOpen(false)}
                  className="size-fit rounded-4xl p-1 bg-[#344C3F]"
                >
                  <img
                    src="/menu-active.svg"
                    alt="Close menu"
                    className="size-[24px]"
                  />
                </button>
              </div>
              <ul className="flex flex-col h-fit w-full">
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(0)}
                >
                  How it Works
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(1)}
                >
                  Pricing
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(2)}
                >
                  Blog
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(3)}
                >
                  About Us
                </li>
              </ul>
            </div>
            <CreateEventBtn
              onClick={() => setNavOpen(false)}
              bgcolor="bg-[#AEFC40]"
              text="create event"
              textcolor="text-[#011F0F] py-4 text-base"
            />
          </div>
        </nav>
      )}

      {/* Sticky Navigation Bar */}
      <div className="top-0 sticky z-20 justify-center items-center flex">
        <LandingNav
          onClick={() => setNavOpen(true)}
          setActiveItem={setActiveItem || (() => {})}
          activeItem={activeItem}
        />
      </div>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer (conditional) */}
      {showFooter && Footer && <Footer />}
    </div>
  );
};

export default NavigationWrapper;