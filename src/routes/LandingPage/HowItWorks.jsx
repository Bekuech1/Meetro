import React from "react";
import Hero from "@/components/LandingPage/Hero";
import Seamless from "@/components/LandingPage/Seamless";
import Vibe from "@/components/LandingPage/Vibe";
import Guests from "@/components/LandingPage/Guests";
import Smooth from "@/components/LandingPage/Smooth";
import FutureFeatures from "@/components/LandingPage/FutureFeatures";
import Simple from "@/components/LandingPage/Simple";
import LandingBlog from "@/components/LandingPage/LandingBlog";
import JoinToday from "@/components/LandingPage/JoinToday";



const HowItWorks = ( {onClick} ) => {
  return (
    <>
      <Hero />
      <Seamless />
      <Vibe />
      <Guests />
      <Smooth />
      <FutureFeatures />
      <Simple />
      <LandingBlog onClick={onClick} />
      <JoinToday />
    </>
  );
};

export default HowItWorks;