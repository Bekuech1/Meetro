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



const HowItWorks = ( {onClick, goToBlog, openBlog} ) => {
  return (
    <>
      <Hero onClick={onClick}/>
      <Seamless onClick={onClick}/>
      <Vibe onClick={onClick}/>
      <Guests onClick={onClick}/>
      <Smooth onClick={onClick}/>
      <FutureFeatures onclick={onClick}/>
      <Simple onClick={onClick}/>
      <LandingBlog onClick={openBlog} goToBlog={goToBlog} />
      <JoinToday onClick={onClick}/>
    </>
  );
};

export default HowItWorks;