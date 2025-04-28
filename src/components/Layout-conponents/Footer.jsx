import React, { useState, useCallback, useEffect } from "react";
import Button from "./Button";
import Legal from "./Legal";

const Footer = ({ onclick }) => {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [label, setLabel] = useState(""); // Set label to be a string

  const openLegal = useCallback((component) => {
    setLabel(component); // Set the label to the current component name
    setIsLegalOpen(true);
  }, []);

  const closeLegal = useCallback(() => {
    setIsLegalOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLegalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLegalOpen]);

  return (
    <div className="bg-[#01160B] md:px-[60px] px-4 py-[64px]">
      <div className="grid md:flex border-b border-white/10 pb-10 gap-[40px] md:justify-between">
        <div className="grid gap-6 h-fit w-fit mx-auto md:mx-0">
          <img src="meetroLogo.svg" alt="" className="mx-auto md:mx-0" />
          <a
            href="mailto:connect@meetro.live"
            className="font-[500] md:text-[18px] md:leading-[28px] text-[14px] leading-5 text-[#B0B5B5] paytone"
          >
            connect@Meetro.live
          </a>
        </div>
        <div className="w-fit h-fit flex gap-4 mx-auto md:mx-0">
          <a
            href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button name="Join Community" color="bg-white" />
          </a>
          <Button name="Join waitlist" color="bg-[#AFFC41]" onclick={onclick} />
        </div>
      </div>
      <div className="grid md:flex md:justify-between py-10 gap-6">
        <p className="md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] mx-auto md:mx-0 satoshi">
          © 2024 Meetro All rights reserved
        </p>
        <div className="flex md:gap-6 gap-2 mx-auto md:mx-0">
          <p
            className="md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize satoshi cursor-pointer"
            onClick={() => openLegal("Terms")} // Set active component to Terms
          >
            Terms of Service
          </p>
          <p
            className="md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize satoshi cursor-pointer"
            onClick={() => openLegal("Privacy")} // Set active component to Privacy
          >
            Privacy Policy
          </p>
          <p
            className="md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize satoshi cursor-pointer"
            onClick={() => openLegal("Data")} // Set active component to Data
          >
            Data Policy
          </p>
          <p
            className="md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize satoshi cursor-pointer"
            onClick={() => openLegal("Cookies")} // Set active component to Cookies
          >
            Cookies
          </p>
        </div>
      </div>
      <img src="meetroFooter.svg" alt="" className="w-full" />
      {isLegalOpen && <Legal closeLegal={closeLegal} label={label} />}
    </div>
  );
};

export default Footer;
