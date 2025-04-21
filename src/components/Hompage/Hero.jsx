import { useState } from "react";
import Button from "../Layout-conponents/Button";
import Navbar from "./Navbar";

const Hero = ( {onclick} ) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div
      id="heroSection"
      className="h-screen w-full relative min-h-[700px]"
      style={{
        backgroundImage: !videoLoaded ? "url('meetroHero.png')" : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Video Background */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src="meetrovid.mp4"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
      />


      <Navbar visibility='invisible' />

      {/* Content */}
      <div className="h-fit grid justify-center items-center w-[91.4%] md:w-[687px] mx-auto md:mt-[30vh] mt-[40vh] gap-10 relative z-10">
        {/* Mobile App Banner */}
        <div className="grid gap-[10px]">
          <div className="bg-white/10 backdrop-blur-[24px] flex paytone items-center justify-center gap-[10px] md:hidden px-3 py-[6px] w-fit mx-auto rounded-4xl">
            <img src="mobilew.svg" alt="phone" />
            <p className="font-[400] text-[12px] text-white">Meetro App</p>
            <button className="bg-gradient-to-tr from-[#97DC37] to-[#055962] rounded-[60px] py-[6px] px-[10px] font-[400] text-white text-[8px] h-fit">
              Coming Soon
            </button>
          </div>

          {/* Heading */}
          <h1 className="capitalize text-[48px] md:text-[60px] paytone font-[400] text-white text-center leading-[48px] md:leading-[100%]">
            Discover, Connect and Create{" "}
            <span className="text-[#AFFC41]">Unforgettable</span> experiences
          </h1>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 w-fit mx-auto">
          <Button name="join community" color="bg-white"/>
          <Button name="join waitlist" color="bg-[#AFFC41]" onclick={onclick}/>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex gap-4 mx-auto">
          <Button name="Join Community" color="bg-white"/>
          <Button name="join waitlist" color="bg-[#AFFC41]" onclick={onclick}/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
