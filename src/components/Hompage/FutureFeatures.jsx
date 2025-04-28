import React from "react";
import Button from "../Layout-conponents/Button";
import SplineComponent from "../Layout-conponents/SplineComp";

const FutureFeatures = ({ onclick }) => {
  return (
    <div className="bg-[#F3F0FB] xl:h-screen h-fit flex flex-col-reverse justify-center gap-[60px] items-center py-12 xl:flex-row">
      <div className="relative md:w-[666px] md:h-[562px] w-[90%] h-[300px] md:overflow-hidden overflow-visible flex justify-center items-center pointer-events-none mx-auto md:mx-0">
        <iframe
          src="https://my.spline.design/untitled-be2bbd8ec37ca2b1a1125ad742bd52aa/"
          frameBorder="0"
          width="125%"
          height="125%"
        ></iframe>
      </div>
      {/* <SplineComponent /> */}
      <div className="grid gap-12 xl:w-fit w-[90%] mx-auto xl:mx-0">
        <div className="grid gap-6">
          <button className=" bg-linear-to-tr from-[#97DC37] to-[#055962] rounded-[60px] py-[12px] px-[24px] font-[400] text-white text-[14px] leading-5 h-fit w-fit paytone">
            Coming Soon
          </button>
          <h5 className="capitalize text-[60px] font-[400] leading-[100%] text-[#4A3A74] paytone">
            future features
          </h5>
          <div className="grid gap-2">
            <div className="flex gap-2">
              <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                Soon, you’ll be able to:
              </h6>
            </div>
            <div className="flex gap-2">
              <img src="tick-square.svg" alt="" />
              <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                Discover local events
              </h6>
            </div>
            <div className="flex gap-2">
              <img src="tick-square.svg" alt="" />
              <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                Match with people attending
              </h6>
            </div>
            <div className="flex gap-2">
              <img src="tick-square.svg" alt="" />
              <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                Join communities you vibe with
              </h6>
            </div>
            <div className="flex gap-2">
              <img src="tick-square.svg" alt="" />
              <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                Create public events & grow your tribe
              </h6>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <h6 className="font-[700] text-[16px] leading-6 text-black satoshi">
            Stay tuned for more exciting updates!
          </h6>
          <div className="flex gap-4 w-fit">
            <Button
              name="Join Waitlist"
              color="bg-[#AFFC41]"
              onclick={onclick}
            />
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
