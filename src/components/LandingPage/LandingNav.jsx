import React, { useState, useCallback, useMemo } from "react";
import Button from "../Layout-conponents/Button";
import CreateEventBtn from "@/components/Layout-conponents/CreateEventBtn";
import { motion} from "framer-motion";
import { useDisableScroll } from "@/hooks/useDisableScroll";

// Move static data outside component to prevent recreating on each render
const NAV_ITEMS = [
  { id: 0, name: "how it works" },
  { id: 1, name: "pricing" },
  { id: 2, name: "blog" },
  { id: 3, name: "about us" },
];

// Pre-define animation variants to avoid recreating objects
const navVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1], 
    opacity: [0, 1],
    transition: { duration: 0.5, ease: "easeInOut", times: [0, 1] }
  }
};

const LandingNav = React.memo(({ activeItem, setActiveItem, onAuth }) => {
  const [navOpen, setNavOpen] = useState(false);
  
  useDisableScroll(navOpen);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleNavItemClick = useCallback((itemId) => {
    setActiveItem(itemId);
    setNavOpen(false);
  }, [setActiveItem]);

  const handleMenuOpen = useCallback(() => setNavOpen(true), []);
  const handleMenuClose = useCallback(() => setNavOpen(false), []);
  const handleCreateEvent = useCallback(() => {
    setNavOpen(false);
    if (onAuth) onAuth();
  }, [onAuth]);
  
  // Prevent event bubbling on mobile nav
  const handleNavClick = useCallback((e) => e.stopPropagation(), []);

  // Memoize the desktop navigation items to prevent re-rendering
  const desktopNavItems = useMemo(() => 
    NAV_ITEMS.map((item) => (
      <li key={item.id}>
        <button
          className={`font-bold text-sm leading-5 capitalize cursor-pointer transition-colors duration-200 satoshi ${
            activeItem === item.id ? "text-[#AEFC40]" : "text-[#B0BAB5]"
          }`}
          onClick={() => setActiveItem(item.id)}
        >
          {item.name}
        </button>
      </li>
    )), [activeItem, setActiveItem]);

  // Memoize mobile navigation items
  const mobileNavItems = useMemo(() =>
    NAV_ITEMS.map((item) => (
      <li key={item.id}>
        <button
          className="w-full h-fit py-4 paytone capitalize font-medium text-[20px] leading-6 text-white cursor-pointer text-left"
          onClick={() => handleNavItemClick(item.id)}
        >
          {item.name}
        </button>
      </li>
    )), [handleNavItemClick]);

  // Memoize mobile nav class to prevent string concatenation on each render
  const mobileNavClass = useMemo(() => 
    `fixed inset-4 bg-[#011F0FE5]/90 backdrop-blur-[100px] pt-3 pb-6 pr-4 pl-6 flex-col rounded-4xl justify-between z-[100] max-h-[calc(100vh-2rem)] 
   ${navOpen ? "flex" : "hidden"}`,
    [navOpen]
  );

  return (
    <>
      <motion.nav
        className="flex items-center md:size-fit h-fit w-[90%] rounded-4xl top-3 py-2 md:pl-6 pl-4 pr-4 md:gap-[60px] justify-between bg-[#011F0F] backdrop-blur-2xl satoshi z-100 fixed"
        variants={navVariants}
        initial="initial"
        animate="animate"
      >
        <div className="inline-flex gap-[10px] items-center">
          <img src="/meetroLogo.svg" alt="Meetro Logo" loading="lazy" />
          <div className="bg-linear-to-r from-[#BCFF5C] to-[#C0A8FF] text-[8px] font-[700] leading-tight size-fit capitalize p-1 rounded-2xl text-[#011F0F]">
            <span>Beta</span>
          </div>
        </div>

        <ul className="md:flex size-fit gap-4 hidden">
          {desktopNavItems}
        </ul>

        <div className="w-fit flex justify-center items-center gap-4">
          <Button name="create event" color="bg-[#AFFC41]" onclick={onAuth} />
          <button onClick={handleMenuOpen} className="md:hidden size-fit">
            <img src="/v2menu.svg" alt="Open menu" loading="lazy" />
          </button>
        </div>
      </motion.nav>

      {navOpen && (
        <nav
          className={mobileNavClass}
          role="navigation"
          aria-label="Mobile navigation"
          onClick={handleNavClick}
        >
          <div className="w-full flex flex-col gap-8 h-fit">
            <div className="flex w-full h-fit justify-between">
              <img src="meetroLogo.svg" alt="Meetro Logo" loading="lazy" />
              <button
                onClick={handleMenuClose}
                className="size-fit rounded-4xl p-1 bg-[#344C3F]"
                aria-label="Close navigation menu"
              >
                <img src="/menu-active.svg" alt="" className="size-[24px]" loading="lazy" />
              </button>
            </div>
            <ul className="flex flex-col h-fit w-full">
              {mobileNavItems}
            </ul>
          </div>
          <CreateEventBtn
            onClick={handleCreateEvent}
            bgcolor="bg-[#AEFC40]"
            text="create event"
            textcolor="text-[#011F0F]"
          />
        </nav>
      )}
    </>
  );
});

export default LandingNav;