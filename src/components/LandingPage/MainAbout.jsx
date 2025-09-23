import React from "react";
import { useState } from "react";
import TagButton from "../Layout-conponents/Buttons/TagButton";
import { AddSquare } from "iconsax-reactjs";

const MainAbout = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const handleClick = id => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const variants = ["light-purple", "light-green", "white", "green", "purple"];
  const sizes = ["lg", "md", "sm", "xs"];

  return (
    <div className="relative w-full h-fit min-h-[600px] flex flex-col gap-10 bg-[#FCFEF9] satoshi py-24">
      <div className="flex flex-col gap-6 md:w-[702px] w-[90%] h-fit justify-center text-center mx-auto mt-6">
        <h1 className="paytone md:text-[60px] text-[40px] leading-none text-[#011F0F] font-[400] capitalize">
          about us
        </h1>
        <p className="satoshi text-[20px] leading-6 text-[#011F0F] font-[500]">
          Helping people actually meet up again.
        </p>
        <img
          src="/about-hero.png"
          alt=""
          className="lg:w-[848px] lg:h-[515px] rounded-[32px] object-cover sm:w-[580px] sm:h-[380px] w-full h-[205px] mx-auto"
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
      <div className="fix w-full h-[800px] pt-10 flex gap-4 flex-wrap">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Color Variants (Medium Size)
          </h2>
          <div className="flex flex-wrap gap-4">
            {variants.map(variant => (
              <TagButton
                key={variant}
                variant={variant}
                text={variant.replace("-", " ")}
                onClick={() => handleClick(variant)}
                state={loadingStates[variant] ? "loading" : "default"}
              />
            ))}
          </div>
        </div>

        {/* All Sizes */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Size Variants (Purple)
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map(size => (
              <TagButton
                key={size}
                variant="purple"
                size={size}
                text={`${size.toUpperCase()} Size`}
                onClick={() => handleClick(`size-${size}`)}
                state={loadingStates[`size-${size}`] ? "loading" : "default"}
              />
            ))}
          </div>
        </div>

        {/* With Icons */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <TagButton
              variant="light-green"
              text="With Left Icon"
              rightIcon={AddSquare}
              onClick={() => handleClick("left-icon")}
              state={loadingStates["left-icon"] ? "loading" : "default"} 
            />
            <TagButton
              variant="green"
              text="With Right Icon"
              rightImg="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7' /%3E%3C/svg%3E"
              onClick={() => handleClick("right-icon")}
              state={loadingStates["right-icon"] ? "loading" : "default"}
            />
            <TagButton
              variant="purple"
              text="Both Icons"
              leftImg="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E"
              rightImg="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E"
              onClick={() => handleClick("both-icons")}
              state={loadingStates["both-icons"] ? "loading" : "default"}
            />
          </div>
        </div>

        {/* Disabled State */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Disabled State
          </h2>
          <div className="flex flex-wrap gap-4">
            <TagButton variant="purple" text="Disabled Button" disabled />
            <TagButton
              variant="green"
              size="lg"
              text="Large Disabled"
              disabled
              leftImg='/trash.svg'
            />
          </div>
        </div>
      </div>
      <div className="absolute flex justify-between items-center w-full h-fit bg-transparent -top-[250px]">
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>
    </div>
  );
};

export default MainAbout;
