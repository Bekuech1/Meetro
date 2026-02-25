import React from "react";
import FutureFeatures from "@/components/landing-page/FutureFeatures";
import JoinToday from "@/components/landing-page/JoinToday";
import PricingList from "@/components/landing-page/PricingList";

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
