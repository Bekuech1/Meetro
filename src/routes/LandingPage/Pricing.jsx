import React from "react";
import FutureFeatures from "@/components/LandingPage/FutureFeatures";
import JoinToday from "@/components/LandingPage/JoinToday";
import PricingList from "@/components/LandingPage/PricingList";

const Pricing = () => {
  return (
    <>
      <PricingList />
      <JoinToday />
      <FutureFeatures />
    </>
  );
};

export default Pricing;