import React from "react";
import Hero from "@/components/landing-page/Hero";
import Seamless from "@/components/landing-page/Seamless";
import Vibe from "@/components/landing-page/Vibe";
import Guests from "@/components/landing-page/Guests";
import Smooth from "@/components/landing-page/Smooth";
import FutureFeatures from "@/components/landing-page/FutureFeatures";
import Simple from "@/components/landing-page/Simple";
import LandingBlog from "@/components/landing-page/LandingBlog";
import JoinToday from "@/components/landing-page/JoinToday";

const HowItWorks = () => {
  return (
    <React.Fragment>
      <Hero />
      <Seamless />
      <Vibe />
      <Guests />
      <Smooth />
      <FutureFeatures />
      <Simple />
      <LandingBlog />
      <JoinToday />
    </React.Fragment>
  );
};

export default HowItWorks;
