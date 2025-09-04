import React from "react";
import Button from "../Layout-conponents/Button";
import Lottie from "react-lottie";
import animationData from "../Layout-conponents/bgmove.json";
import CtaButton from "../Layout-conponents/CtaButton";

const JoinToday = ({ onclick }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Lottie options={defaultOptions} />
      </div>

      <div className="grid gap-12 w-fit h-screen items-center m-auto relative z-10">
        <div className="grid gap-6 justify-center text-center w-fit h-fit">
          <h4 className="capitalize text-[#4A3A74] text-[36px] md:text-[60px] leading-[100%] font-[400] paytone">
            join meetro today!
          </h4>
          <p className="text-[14px] md:text-[16px] font-[700] leading-5 md:leading-[24px] text-[#B0B5B5] max-w-[90%] mx-auto satoshi">
            Start discovering exciting events in your area and never miss out.
          </p>
          <div className="flex gap-4 mx-auto w-fit mt-6">
            <a
              href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button name="Join Community" color="bg-white" />
            </a>
            <CtaButton name="create event" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinToday;