import React from "react";
import FutureFeatures from "@/components/LandingPage/FutureFeatures";
import Mission from "@/components/LandingPage/Mission";
import Values from "@/components/LandingPage/Values";
import MainAbout from "@/components/LandingPage/MainAbout";

const AboutUs = () => {
  return (
    <React.Fragment>
      <MainAbout />
      <Values />
      <Mission />
      <FutureFeatures />
    </React.Fragment>
  );
};

export default AboutUs;
