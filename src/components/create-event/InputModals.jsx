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
    <div className="fixed inset-0 h-screen flex sm:items-center items-end justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
      <div className="sm:w-[432px] sm:h-fit h-[68vh] w-full flex flex-col justify-center items-center relative rounded-4xl">
        <div className="bg-white px-6 py-3 text-left w-full h-fit rounded-t-4xl flex items-center">
          <h1 className="satoshi font-[700] sm:text-[20px] text-sm capitalize text-black w-full">
            {title}
          </h1>
          <img src="close-circle.svg" className="size-6 sm:hidden flex" onClick={onClose} />
        </div>
        <div className="sm:rounded-b-4xl w-full sm:h-fit h-full p-6 pt-3 flex flex-col gap-4 bg-gray-100">
          <div
            style={{
              boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(16px)",
            }}
            className={`flex p-[4px] rounded-[20px] bg-white w-full h-fit justify-center text-center ${hidden}`}
          >
            <div
              className={`flex items-center py-1 px-2 w-full rounded-3xl cursor-pointer justify-center ${
                activeOption === "1" ? "bg-[#BEFD66]" : "bg-white"
              }`}
              onClick={() => handleOptionClick("1")}
            >
              <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                {text1}
              </h5>
            </div>
            <div
              className={`flex items-center py-1 px-2 w-full rounded-3xl cursor-pointer justify-center ${
                activeOption === "2" ? "bg-[#BEFD66]" : "bg-white"
              }`}
              onClick={() => handleOptionClick("2")}
            >
              <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                {text2}
              </h5>
            </div>
            <div
              className={`flex items-center py-1 px-2 w-full rounded-3xl cursor-pointer justify-center ${hidden3} ${
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
          <div className="h-full items-start">{children[activeOption - 1]}</div>

          <div className="w-full h-[1px] bg-[#E2E2E2] sm:block hidden"></div>
          <div className="flex justify-center items-center gap-4 h-fit">
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
          className="h-12 w-12 absolute sm:flex hidden -top-10 left-[99%] cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InputModals;
