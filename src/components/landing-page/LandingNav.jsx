import { useDisableScroll } from "@/hooks/useDisableScroll";
import { motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Button from "../layout-components/Button";
import Modal from "../layout-components/Modal/Modal";
import { useModalContext } from "../layout-components/Modal/ModalContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCreateEvent } from "@/hooks/useCreateEvent";

const NAV_ITEMS = [
  { id: 0, name: "how it works", path: "/" },
  { id: 1, name: "pricing", path: "/pricing" },
  { id: 2, name: "blog", path: "/blog" },
  { id: 3, name: "about us", path: "/about" },
];

const navVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.5, ease: "easeInOut", times: [0, 1] },
  },
};

const LandingNav = React.memo(() => {
  // Menu open state
  const [navOpen, setNavOpen] = useState(false);
  // Disable scroll if nav is open
  useDisableScroll(navOpen);

  const { handleCreateEvent } = useCreateEvent();
  // Open menu
  const handleMenuOpen = useCallback(() => setNavOpen(true), []);
  // Close menu
  const handleMenuClose = useCallback(() => setNavOpen(false), []);

  // Memoize the desktop navigation items to prevent re-rendering
  const desktopNavItems = useMemo(
    () =>
      NAV_ITEMS.map(item => (
        <li key={item.id}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `font-bold text-sm leading-5 capitalize cursor-pointer transition-colors duration-200 satoshi ${isActive ? "text-[#AEFC40]" : "text-[#B0BAB5]"
              }`
            }
            onClick={handleMenuClose}
          >
            {item.name}
          </NavLink>
        </li>
      )),
    []
  );

  // Memoize mobile navigation items
  const mobileNavItems = useMemo(
    () =>
      NAV_ITEMS.map(item => (
        <li key={item.id}>
          <NavLink
            to={item.path}
            onClick={handleMenuClose}
            className={({ isActive }) =>
              `w-full h-fit flex py-4 paytone capitalize font-medium text-[20px] leading-6 cursor-pointer text-left transition-colors duration-200 ${isActive ? "text-[#AEFC40]" : "text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        </li>
      )),
    []
  );

  // Memoize mobile nav class to prevent string concatenation on each render
  const mobileNavClass = useMemo(
    () =>
      `fixed top-3 inset-4 w-[calc(100%-32px)] left-1/2 max-w-[712px] -translate-x-1/2 bg-[#011F0FE5]/90 backdrop-blur-[100px] pt-[13px] pb-6 px-4 flex-col rounded-4xl justify-between z-[100] max-h-[calc(100vh-2rem)] 
   ${navOpen ? "flex" : "hidden"}`,
    [navOpen]
  );

  return (
    <>
      <motion.nav
        className="flex items-center h-fit w-[calc(100%-32px)] min-h-[58px] max-w-[712px] rounded-4xl top-3 py-[7px] md:pl-6 pl-4 pr-4 md:gap-[60px] justify-between bg-[#011F0F] backdrop-blur-2xl satoshi z-100 fixed"
        variants={navVariants}
        initial="initial"
        animate="animate"
      >
        <div className="inline-flex gap-[10px] items-center w-fit">
          <img
            src="/meetroLogo.svg"
            alt="Meetro Logo"
            loading="lazy"
            className="w-[97px]"
          />
          <span className="bg-linear-to-r satoshi flex justify-center items-center from-[#BCFF5C] to-[#C0A8FF] text-[8px] font-[700] min-w-[26px] size-fit capitalize px-1 h-[14px] leading-[14px] rounded-2xl text-[#011F0F]">
            Beta
          </span>
        </div>

        <div className="w-full flex justify-end items-center gap-4">
          <ul className="md:flex flex-1 justify-center size-fit gap-4 hidden">
            {desktopNavItems}
          </ul>

          <div className="justify-center flex items-center gap-4">
            <Button
              name="create event"
              color="bg-[#AFFC41]"
              className="!px-3 min-[400px]:!px-6 hidden min-[375px]:flex"
              onClick={handleCreateEvent}
            />

            <button onClick={handleMenuOpen} className="md:hidden size-fit">
              <img src="/v2menu.svg" alt="Open menu" loading="lazy" />
            </button>
          </div>
        </div>
      </motion.nav>

      {navOpen && (
        <nav
          className={mobileNavClass}
          role="navigation"
          aria-label="Mobile navigation"
          onClick={handleMenuClose}
        >
          <div className="w-full flex flex-col gap-8 h-fit">
            <div className="flex w-full items-center h-fit justify-between">
              <img
                src="/meetroLogo.svg"
                alt="Meetro Logo"
                loading="lazy"
                className="w-[97px]"
              />
              <button
                onClick={handleMenuClose}
                className="size-fit rounded-4xl p-1 bg-[#344C3F]"
                aria-label="Close navigation menu"
              >
                <img
                  src="/menu-active.svg"
                  alt=""
                  className="size-[24px]"
                  loading="lazy"
                />
              </button>
            </div>
            <ul className="flex flex-col h-fit w-full">{mobileNavItems}</ul>
          </div>
          <div>
            <Button
              className="w-full!"
              name="create event"
              color="bg-[#AFFC41]"
              onClick={handleCreateEvent}
            />
          </div>
        </nav>
      )}
    </>
  );
});

export default LandingNav;
