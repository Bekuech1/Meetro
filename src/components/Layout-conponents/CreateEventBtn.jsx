import React from "react";

const CreateEventBtn = ({ text, textcolor, onClick, bgcolor }) => {
  return (
    <button
      className={`w-full h-fit rounded-[60px] flex gap-2 p-[10px] justify-center items-center cursor-pointer ${bgcolor} capitalize`}
      onClick={onClick}
    >
      <h6
        className={`paytone sm:font-[700] font-[500] sm:text-[14px] text-[10px] sm:leading-[20px] leading-[14px] ${textcolor}`}
      >
        {text}
      </h6>
    </button>
  );
};

export default CreateEventBtn;
