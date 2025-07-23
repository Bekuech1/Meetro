import React, { useState, useEffect, useRef } from "react";
import Button from "../Layout-conponents/Button";
import SplineComponent from "../Layout-conponents/SplineComp";

const FutureFeatures = ({ onclick }) => {
  const featureItems = [
    "Discover local events",
    "Match with people attending",
    "Join communities you vibe with",
    "Create public events & grow your tribe",
  ];

  return (
    <div className="bg-[#F3F0FB] xl:h-screen h-fit flex flex-col-reverse justify-center gap-[60px] items-center py-12 xl:flex-row">
      <div className="fixrelative md:w-[666px] md:h-[562px] w-[90%] h-[300px] md:overflow-hidden overflow-visible flex justify-center items-center mx-auto md:mx-0 pointer-events-none">
        <div className="size-full overflow-hidden flex justify-center items-center">
          <img
            src="/illustration-rotating-card.gif"
            alt="Descriptive Text"
            className="lg:scale-350 scale-200"
          />
        </div>
      </div>

      <div className="grid gap-12 xl:w-fit w-[90%] mx-auto xl:mx-0">
        <div className="grid gap-6">
          <button className="bg-linear-to-tr from-[#97DC37] to-[#055962] rounded-[60px] py-[12px] px-[24px] font-[400] text-white text-[14px] leading-5 h-fit w-fit paytone">
            Coming Soon
          </button>
          <h5 className="capitalize md:text-[60px] text-[40px] font-[400] leading-[100%] text-[#4A3A74] paytone">
            We’re Just Getting <br /> Started.
          </h5>
          <div className="grid gap-2">
            <div className="flex gap-2">
              <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                Soon, you'll be able to:
              </h6>
            </div>

            {featureItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <img src="/tick-square.svg" alt="" loading="lazy" />
                <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                  {item}
                </h6>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
            Stay tuned for more exciting updates!
          </h6>
          <div className="flex gap-4 w-fit">
            <a
              href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button name="Join Community" color="bg-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureFeatures;