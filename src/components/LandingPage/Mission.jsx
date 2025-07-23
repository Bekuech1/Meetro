import React from "react";

const Mission = () => {
  return (
    <div className="bg-[#E6F2F3] xl:h-screen h-fit xl:flex xl:flex-row-reverse grid justify-center gap-[60px] items-center py-12">
      <img
        src="/faces-img.png"
        alt=""
        className="md:w-[600px] w-[90%] min-h-[300px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[532px] max-h-[562px] object-cover rounded-4xl md:mx-0 mx-auto"
      />
      <div className="grid gap-12 xl:w-[45%] w-[90%] xl:mx-0 max-w-[500px]">
        <div className="grid gap-6">
          <h5 className="capitalize text-[36px] md:text-[48px] font-[400] leading-[100%] text-[#055962] w-fit lg:w-[560px] paytone">
            our mission our goal
          </h5>
          <div className="grid gap-2 w-fit">
            <div className="flex gap-2 w-fit">
              <h6 className="font-[700] text-[14px] md:text-[16px] leading-6 text-[#06727E] satoshi">
                To make real-life connections easier, more intentional, and more
                fun. We believe great things happen when people come together
                and we’re on a mission to bring that back.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;