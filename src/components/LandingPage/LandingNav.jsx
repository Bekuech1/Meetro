import React, { useState } from "react";
import Button from "../Layout-conponents/Button";
import { motion, spring } from "framer-motion";

const LandingNav = ({ activeItem, setActiveItem, onClick, onAuth }) => {
  const navItems = [
    { id: 0, name: "how it works" },
    { id: 1, name: "pricing" },
    { id: 2, name: "blog" },
    { id: 3, name: "about us" },
  ];

  return (
    <motion.nav
      className="flex items-center md:size-fit h-fit w-[90%] rounded-4xl top-3 py-2 md:pl-6 pl-4 pr-4 md:gap-[60px] justify-between bg-[#011F0F] backdrop-blur-2xl satoshi z-100 fixed"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1], opacity: [0, 1] }}
      transition={{ duration: 0.5, ease: "easeInOut", times: [0, 1] }}
    >
      <div className="inline-flex gap-[10px]">
        <img src="/meetroLogo.svg" alt="" />
        <div className="bg-linear-to-r from-[#BCFF5C] to-[#C0A8FF] text-[12px] font-[700] leading-[18px] size-fit capitalize p-1 rounded-3xl text-[#011F0F] flex place-items-center">
          Beta
        </div>
      </div>

      <ul className="md:flex size-fit gap-4 hidden">
        {navItems.map((item) => (
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
        ))}
      </ul>

      <div className="w-fit flex justify-center items-center gap-4">
        <Button name="create event" color="bg-[#AFFC41]" onclick={onAuth} />

        <button onClick={onClick} className="md:hidden size-fit">
          <img src="/v2menu.svg" alt="" />
        </button>
      </div>
    </motion.nav>
  );
};

export default LandingNav;