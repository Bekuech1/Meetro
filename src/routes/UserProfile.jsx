import React from "react";
import Header from "../components/home/Header";
import Footer from "../components/Layout-conponents/Footer";
import PersonalProfile from "../components/Profile/PersonalProfile";

const UserProfile = () => {
  return (
    <div className="bg-[#F0F0F0] relative">
      {/* <img
        src="/bgshadow.png"
        alt=""
        className="absolute top-0 left-0 w-full z-0"
      /> */}

      {/* background ellipses */}
      <div className="absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        {/* <!-- Left Ellipse --> */}
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>

        {/* <!-- Middle Ellipse --> */}
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>

        {/* <!-- Right Ellipse --> */}
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <div className="w-full md:w-[680px] md:h-[681px] py-10 mx-auto">
          <PersonalProfile />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
