import React from "react";
import FutureFeatures from "@/components/LandingPage/FutureFeatures";
import JoinToday from "@/components/LandingPage/JoinToday";
import PricingList from "@/components/LandingPage/PricingList";

const Pricing = () => {
  return (
    <React.Fragment>
      <PricingList />
      <JoinToday />
      <FutureFeatures />
    </React.Fragment>
  );
};

export default Pricing;
