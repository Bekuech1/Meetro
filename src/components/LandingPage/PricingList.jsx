import React from "react";
import Button from "../Layout-conponents/Button";
import Gradient from "../Layout-conponents/Gradient";
import { useNavigate } from "react-router";
import { useCreateEvent } from "@/hooks/useCreateEvent";

const PRICING_DATA = [
  {
    id: 1,
    heading: "It's all Free",
    features: [
      "Create and manage private events",
      "Invite friends and track RSVPs",
      "Customize your event details",
      "Choose from themes to match the vibe",
      "Chip In options for guests to contribute",
      "Event dashboard with attendee management",
      "Social links and updates",
    ],
  },
  {
    id: 2,
    heading: "Our pricing is simple",
    subtext: "We only charge when money moves and we keep it simple:",
    features: [
      "7% + ₦200 fee for paid event",
      "Fees are paid by ticket buyers on paid tickets, unless you choose to cover them.",
    ],
  },
];

const PricingComponent = ({ heading, subtext, features, onClick }) => {
  return (
    <div className="max-w-[515px] w-full md:h-[434px] h-[490px] rounded-4xl border border-[#C7BAEA] backdrop-blur-2xl bg-[#D9D1F1]/40 flex flex-col justify-between p-8">
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
      <Button name="Get Started" color="bg-white" onClick={onClick} />
    </div>
  );
};

const PricingList = () => {
  const { handleCreateEvent } = useCreateEvent();
  return (
    <div className="relative w-full h-fit pt-[148px] pb-[66px] min-h-screen flex flex-col gap-10 bg-[#FCFEF9] satoshi">
      <div className="flex flex-col gap-6 max-w-[563px] w-full justify-center text-center mx-auto">
        <h1 className="paytone md:text-[60px] text-[40px] leading-none text-[#011F0F] font-[400] capitalize">
          💸 Pricing That Works for You
        </h1>
        <p className="satoshi text-[16px] leading-6 text-black font-[500]">
          All features are free to use. We only make money when you do through
          small fees on ticket sales or Chip In contributions.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 justify-center px-4 items-center mx-auto w-full max-w-[1102px]">
        {PRICING_DATA.map(plan => (
          <PricingComponent
            key={plan.id}
            heading={plan.heading}
            subtext={plan.subtext}
            features={plan.features}
            onClick={handleCreateEvent}
          />
        ))}
      </div>
      <div className="absolute flex justify-between items-center w-full h-fit bg-transparent -bottom-[250px]">
        <Gradient opacity="opacity-[20%]" />
        <Gradient
          color="#866AD2"
          opacity="opacity-[20%]"
          className="-mt-[100px]"
        />
        <Gradient color="#077D8A" opacity="opacity-[20%]" />
      </div>
    </div>
  );
};

export default PricingList;
