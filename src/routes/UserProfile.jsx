import React from "react";

import Header from "../components/home/header";
import Footer from "../components/Layout-conponents/Footer";
import PersonalProfile from "../components/Profile/PersonalProfile";

const UserProfile = () => {
  return (
    <div className="bg-[#F0F0F0] relative">
      <img
        src="/bgshadow.png"
        alt=""
        className="absolute top-0 left-0 w-full z-0"
      />

      <div className="relative z-10">
        <Header />

        <div className="w-[680px] h-[681px] py-10 mx-auto z-10">
          <PersonalProfile />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
