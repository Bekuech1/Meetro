import React from "react";
import FutureFeatures from "@/components/landing-page/FutureFeatures";
import Mission from "@/components/landing-page/Mission";
import Values from "@/components/landing-page/Values";
import MainAbout from "@/components/landing-page/MainAbout";

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
