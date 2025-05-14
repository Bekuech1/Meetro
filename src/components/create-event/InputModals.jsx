import React, { useState } from "react";
import CreateEventBtn from "../Layout-conponents/CreateEventBtn";

const InputModals = ({
  isVisible,
  onClose,
  children,
  title,
  onSave,
  text1,
  text2,
  text3,
  hidden = "",
  hidden3 = "",
}) => {
  const [activeOption, setActiveOption] = useState("1"); // Track the active option

  const handleOptionClick = (id) => {
    setActiveOption(id); // Update the active option state
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
      <div className="md:w-[432px] h-fit flex flex-col justify-center items-center relative rounded-4xl">
        <div className="bg-white px-6 py-3 text-left w-full h-fit rounded-t-4xl">
          <h1 className="satoshi font-[700] text-[20px] capitalize text-black">
            {title}
          </h1>
        </div>
        <div className="rounded-b-4xl w-full h-fit p-6 pt-3 grid gap-4 bg-gray-100">
          <div
            style={{
              boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(16px)",
            }}
            className={`flex p-[4px] rounded-[20px] bg-white w-full h-fit text-center ${hidden}`}
          >
            <div
              className={`items-center py-1 px-2 w-full rounded-3xl cursor-pointer ${
                activeOption === "1" ? "bg-[#BEFD66]" : "bg-white"
              }`}
              onClick={() => handleOptionClick("1")}
            >
              <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                {text1}
              </h5>
            </div>
            <div
              className={`items-center py-1 px-2 w-full rounded-3xl cursor-pointer ${
                activeOption === "2" ? "bg-[#BEFD66]" : "bg-white"
              }`}
              onClick={() => handleOptionClick("2")}
            >
              <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                {text2}
              </h5>
            </div>
            <div
              className={`items-center py-1 px-2 w-full rounded-3xl cursor-pointer ${hidden3} ${
                activeOption === "3" ? "bg-[#BEFD66]" : "bg-white"
              }`}
              onClick={() => handleOptionClick("3")}
            >
              <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                {text3}
              </h5>
            </div>
          </div>
          {/* Render content based on the active option */}
          <div>{children[activeOption - 1]}</div>

          <div className="w-full h-[1px] bg-[#E2E2E2]"></div>
          <div className="flex justify-center items-center gap-4">
            <CreateEventBtn
              text="cancel"
              onClick={onClose}
              textcolor="text-[#000000]"
              bgcolor="bg-[#FFFFFE]"
            />
            <CreateEventBtn
              text="save"
              onClick={onSave}
              textcolor="text-[#AEFC40]"
              bgcolor="bg-[#011F0F]"
            />
          </div>
        </div>
        <img
          src="closePopup.svg"
          alt="close popup"
          className="h-12 w-12 absolute md:-top-10 -top-14 md:left-[99%] left-[90%] cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InputModals;
