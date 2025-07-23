import React from "react";
import Button from "../Layout-conponents/Button";

const PricingComponent = ({ heading, subtext, features }) => (
  <div className="md:w-[515px] w-[90%] md:h-[434px] h-[490px] rounded-4xl border border-[#C7BAEA] backdrop-blur-2xl bg-[#D9D1F1]/40 flex flex-col justify-between p-8">
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 h-fit">
        <h3 className="paytone font-normal text-[30px] leading-9 text-[#4A3A7A]">
          {heading}
        </h3>
        {subtext && (
          <p className="satoshi text-base font-bold text-[#5F4B95]">
            {subtext}
          </p>
        )}
      </div>
      <ul className="flex flex-col lg:gap-2 gap-1 h-fit">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 h-fit w-full">
            <img src="/tick-square2.svg" alt="" loading="lazy" />
            <span className="satoshi text-base font-bold text-[#866AD2] leading-6">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
    <Button name="get started" color="bg-white" />
  </div>
);

const PricingList = () => {
  return (
    <div className="relative w-full h-fit py-20 min-h-[780px] flex flex-col gap-10 bg-[#FCFEF9] satoshi ">
      <div className="flex flex-col gap-6 md:w-[563px] w-[90%] h-fit justify-center text-center mx-auto">
        <h1 className="paytone md:text-[60px] text-[40px] leading-none text-[#011F0F] font-[400] capitalize">
          💸 Pricing That Works for You
        </h1>
        <p className="satoshi text-[16px] leading-6 text-black font-[500]">
          All features are free to use. We only make money when you do through
          small fees on ticket sales or Chip In contributions.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center w-fit mx-auto max-w-[1200px]">
        <PricingComponent
          heading="It’s all Free"
          features={[
            "Create and manage private events",
            "Invite friends and track RSVPs",
            "Customize your event details",
            "Choose from themes to match the vibe",
            "Chip In options for guests to contribute",
            "Event dashboard with attendee management",
            "Social links and updates",
          ]}
        />
        <PricingComponent
          heading="Our pricing is simple"
          subtext="We only charge when money moves and we keep it simple:"
          features={[
            "7% + ₦200 fee for paid event",
            "Fees are paid by ticket buyers on paid tickets, unless you choose to cover them.",
          ]}
        />
      </div>
      <div className="absolute flex justify-between items-center w-full h-fit bg-transparent -bottom-[250px]">
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>
    </div>
  );
};

export default PricingList;