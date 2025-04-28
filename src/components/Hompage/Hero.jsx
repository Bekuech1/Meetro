import { useState } from "react";
import Button from "../Layout-conponents/Button";
import Navbar from "./Navbar";

const Hero = ({ onclick }) => {
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

      <Navbar visibility="invisible" />

      {/* Content */}
      <div className="h-fit grid justify-center items-center w-[91.4%] md:w-[687px] mx-auto md:mt-[30vh] mt-[40vh] gap-10 relative z-10">
        {/* Mobile App Banner */}
        <div className="grid gap-[10px]">
          {/* Heading */}
          <h1 className="capitalize text-[48px] md:text-[60px] paytone font-[400] text-white text-center leading-[48px] md:leading-[100%]">
            Discover, Connect and Create{" "}
            <span className="text-[#AFFC41]">Unforgettable experiences</span>
          </h1>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 w-fit mx-auto">
          <a
            href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button name="Join Community" color="bg-white" />
          </a>

          <Button name="join waitlist" color="bg-[#AFFC41]" onclick={onclick} />
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex gap-4 mx-auto">
          <a
            href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button name="Join Community" color="bg-white" />
          </a>

          <Button name="join waitlist" color="bg-[#AFFC41]" onclick={onclick} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
