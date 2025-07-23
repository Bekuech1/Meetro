import React from "react";
import Button from "../Layout-conponents/Button";

const Vibe = () => {
  return (
    <div className="bg-[#011F0F] xl:h-screen h-fit xl:flex grid justify-center gap-[60px] items-center py-12">
      <div className="md:w-[600px] w-[90%] relative min-h-[300px] sm:min-h-[300px] md:min-h-[400px] md:mx-0 mx-auto lg:min-h-[532px] max-h-[562px] overflow-y-hidden bg-[linear-gradient(180deg,rgba(123,173,52,0.1)_0%,rgba(122,161,91,0.1)_100%)] backdrop-blur-[32px] flex justify-center rounded-4xl">
        <div className="w-[313px] h-[669px] rounded-[27px] border-[12px] border-[#FFFFFF1A] mt-10">
          <img src="/statusbar.png" alt="" className="rounded-t-2xl" />
          <img src="/frame-test.png" alt="" />
        </div>
        <section className="grid bg-white/10 border backdrop-blur-2xl border-white/20 p-3 rounded-[12px] gap-4 absolute bottom-4 sm:left-[64px] left-[57px]">
          <h6 className="satoshi font-medium text-[14px] leading-5 text-white capitalize">
            themes
          </h6>
          <div className="flex gap-4 h-fit w-full">
            <img src="/vibe1.png" alt="" className="md:size-15 size-9 rounded-[6px] object-cover border border-white" />
            <img src="/vibe2.png" alt="" className="md:size-15 size-9 rounded-[6px] object-cover border border-white" />
            <img src="/vibe3.png" alt="" className="md:size-15 size-9 rounded-[6px] object-cover border border-white" />
            <img src="/vibe4.png" alt="" className="md:size-15 size-9 rounded-[6px] object-cover border border-white" />
            <img src="/vibe5.png" alt="" className="md:size-15 size-9 rounded-[6px] object-cover border border-white" />
            <img src="/vibe6.png" alt="" className="md:size-15 size-9 rounded-[6px] object-cover border border-white" />
          </div>
        </section>
      </div>
      <div className="grid gap-12 xl:w-[45%] w-[90%] mx-auto xl:mx-0 max-w-[500px]">
        <div className="grid gap-6">
          <h5 className="capitalize text-[36px] md:text-[60px] font-[400] leading-[100%] text-[#AEFC40] w-full paytone">
            set the vibe with custom event themes
          </h5>
          <div className="grid gap-2 w-fit">
            <div className="flex gap-2 w-fit">
              <h6 className="font-[700] text-[14px] md:text-[16px] leading-6 text-[#AEFC40] satoshi">
                Whether you're planning a cozy dinner or a rooftop rave, Meetro
                lets you pick themes that match the mood. Your event, your vibe.
              </h6>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-fit">
          <Button name="explore themes" color="bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Vibe;