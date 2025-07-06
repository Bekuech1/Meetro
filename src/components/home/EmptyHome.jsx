import React from "react";
import EventsBtn from "./EventsBtn";
import { useNavigate } from "react-router";

const EmptyHome = () => {
  const navigate = useNavigate();
  const homeBtn = [
    {
      text: "all events",
      image: "/home-arrow-down.svg",
      onClick: () => navigate("/home"),
    },
    {
      text: "march, 2025",
      image: "/home-arrow-down.svg",
      onClick: () => navigate("/home"),
    },
  ];

  return (
    <main className="bg-[#F0F0F0] flex flex-col px-20 py-10 gap-[43px] h-[90vh] max-h-[760px] relative">
      <div className="flex gap-4 justify-center w-full h-fit">
        {homeBtn.map((item, index) => (
          <EventsBtn
            key={index}
            onClick={item.onClick}
            image={item.image}
            text={item.text}
          />
        ))}
      </div>
      <div className="h-full w-full flex justify-center items-center text-center">
        <h1 className="paytone text-[#4A3A74] h-fit sm:text-[36px] sm:font-[400] sm:leading-[100%] text-[24px] font-[400] leading-[32px]">
          Looks like there's nothing happening
          <br /> right now. Why not be the first to
          <br /> create an event?
        </h1>
      </div>
      
      <div class=" absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        {/* <!-- Left Ellipse --> */}
        <div class="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>

        {/* <!-- Middle Ellipse --> */}
        <div class="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>

        {/* <!-- Right Ellipse --> */}
        <div class="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>
    </main>
  );
};

export default EmptyHome;
