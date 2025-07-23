import React from "react";
import Button from "../Layout-conponents/Button";

const Smooth = () => {
  return (
    <div className="bg-[#03353A] xl:h-screen h-fit xl:flex grid justify-center gap-[60px] items-center py-12">
      <div className="md:w-[600px] w-[90%] md:mx-0 mx-auto relative min-h-[300px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[532px] rounded-4xl bg-[linear-gradient(180deg,rgba(208,235,243,0.1)_0%,rgba(121,137,141,0.1)_100%)] backdrop-blur-[32px] flex justify-center items-center">
        <img src="/Rectangle.png" alt="" className="absolute lg:top-[92px] sm:top-[30px] top-[10px] z-2" />
        <img src="/Rectangle1.png" alt="" className="absolute lg:top-[132px] sm:top-[72px] top-[34px] z-1" />
        <img src="/Rectangle2.png" alt="" className="absolute lg:top-[159px] sm:top-[99px]"/>
      </div>
      <div className="grid gap-12 xl:w-[45%] w-[90%] mx-auto xl:mx-0 max-w-[500px]">
        <div className="grid gap-6">
          <h5 className="capitalize text-[36px] md:text-[60px] font-[400] leading-[100%] text-white w-fit lg:w-[560px] paytone">
            smooth event management
          </h5>
          <div className="grid gap-2 w-fit">
            <div className="flex gap-2 w-fit">
              <h6 className="font-[700] text-[14px] md:text-[16px] leading-6 text-[#B2D7DB] satoshi">
                Track RSVPs, send updates, edit details, and manage your guest
                list like a pro without switching between 5 different apps.
              </h6>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-fit">
          <Button name="create events" color="bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Smooth;