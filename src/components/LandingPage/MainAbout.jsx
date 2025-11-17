import React from "react";
import Gradient from "../Layout-conponents/Gradient";

const MainAbout = () => {
  return (
    <div className="relative w-full h-fit min-h-[600px] flex flex-col gap-10 bg-[#FCFEF9] satoshi py-24">
      <div className="flex flex-col gap-6 mx-auto max-w-[734px] px-4 h-fit justify-center text-center mt-6">
        <h1 className="paytone md:text-[60px] text-[40px] leading-none text-[#011F0F] font-[400] capitalize">
          about us
        </h1>
        <p className="satoshi text-[20px] leading-6 text-[#011F0F] font-[500]">
          Helping people actually meet up again.
        </p>
        <img
          src="/about-hero.png"
          alt=""
          className="lg:w-[848px] lg:h-[515px] rounded-[32px] object-cover sm:w-[580px]  w-full h-[345px] mx-auto"
        />
        <p className="satoshi text-[18px] leading-6 text-[#8A9191] font-[500] text-center">
          Meetro was born out of a simple problem we were always missing events
          or finding out too late. Between the noise on social media and the
          stress of planning, it just felt harder to connect in real life.
          <br />
          <br />
          <span className="text-[#011F0F]">So, we built something better.</span>
          <br />
          <br />
          Meetro helps you create, share, and manage private events
          effortlessly, while also making it fun to discover things happening
          around you. Whether it’s a chill hangout with friends or a community
          event, we’re here to make meeting up easy, intentional, and
          stress-free.
        </p>
      </div>

      <div className="absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        {/* Left Ellipse */}
        <Gradient opacity="opacity-[15%]" />
        <Gradient
          className="mt-[100px]"
          opacity="opacity-[15%]"
          color="#866AD2"
        />
        <Gradient opacity="opacity-[15%]" color="#077D8A" />
      </div>
    </div>
  );
};

export default MainAbout;
