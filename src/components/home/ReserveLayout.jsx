import React from "react";
import Text from "../Onboarding/Text";

const ReserveLayout = ({ children, toClose, color, header, subText }) => {
  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px] fix">
      <div className="size-fit rounded-3xl md:p-12 p-6 flex flex-col justify-center items-center bg-[#E8E8E8] relative max-w-[80vw]">
        <div className="grid gap-1 text-center sm:w-[450px] w-full h-fit fix">
          <h1
            className={`paytone font-[400] text-[24px] capitalize text-[${color}]`}
          >
            {header}
          </h1>
          <p className="satosh font-[500] text-[14px] text-[#8A9191]">
            {subText}
          </p>
        </div>
        {children}
        <Text path={"/signin"} />
        <img
          src="closePopup.svg"
          alt="close popup"
          className="h-12 w-12 absolute md:-top-10 -top-14 md:left-full left-[90%] cursor-pointer"
          onClick={toClose}
        />
      </div>
    </div>
  );
};

export default ReserveLayout;
