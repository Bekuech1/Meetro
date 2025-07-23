import React from "react";

const Values = () => {
  return (
    <div className="bg-[#F7FFEC] xl:h-screen h-fit xl:flex grid justify-center gap-[60px] items-center py-12">
      <div className="grid md:w-fit w-[90%] h-fit gap-6 md:mx-0 mx-auto">
        <div className="w-fit h-fit md:py-8 md:px-14 py-5 px-9 paytone capitalize rounded-full bg-[#866AD2] text-white md:text-[72px] text-[48px] font-normal leading-none">
          discover.
        </div>
        <div className="w-fit h-fit md:py-8 md:px-14 py-5 px-9 paytone capitalize rounded-full bg-[#AEFC40] text-[#011F0F] md:text-[72px] text-[48px] font-normal leading-none">
          Connect.
        </div>
        <div className="w-fit h-fit md:py-8 md:px-14 py-5 px-9 paytone capitalize rounded-full bg-[#011F0F] text-[#F7FFEC] md:text-[72px] text-[48px] font-normal leading-none">
          experience.
        </div>
      </div>
      <div className="grid gap-12 xl:w-[45%] w-[90%] mx-auto xl:mx-0 max-w-[500px]">
        <div className="grid gap-6">
          <h5 className="capitalize text-[36px] md:text-[48px] font-[400] leading-[100%] text-[#055962] w-fit lg:w-[560px] paytone">
            Our Foundation Our Values
          </h5>
          <div className="grid gap-2 w-fit">
            <div className="flex gap-2 w-fit">
              <h6 className="font-[500] text-[14px] md:text-[16px] leading-6 text-[#06727E] satoshi">
                This isn't just a feature list it's our foundation.
                <br />
                <br />
                Meetro was built on the belief that life is better when we're
                truly connected. These three values shape every click, screen,
                interaction and feature we are adding. From planning a private
                hangout to joining a spontaneous city event
                <br />
                <br />
                <span className="font-[900]">
                  — Discover. Connect. Experience.
                </span>
                — that's the Meetro way.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;