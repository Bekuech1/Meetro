import React from "react";
import FutureFeatures from "@/components/LandingPage/FutureFeatures";
import Mission from "@/components/LandingPage/Mission";
import Values from "@/components/LandingPage/Values";
import MainAbout from "@/components/LandingPage/MainAbout";

const AboutUs = () => {
  return (
    <>
      <MainAbout />
      <Values />
      <Mission />
      <FutureFeatures />
    </>
  );
};

export default AboutUs;