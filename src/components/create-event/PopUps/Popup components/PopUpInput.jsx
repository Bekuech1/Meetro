import React from "react";

const PopUpInput = ({
  value,
  onIconClick,
  isOpen,
  leftIcon = "/calendar.svg", // Default left icon
  rightIcon = "/arrow-down-gray.svg", // Default right icon
  showLeftIcon = true, // Toggle left icon
  showRightIcon = true, // Toggle right icon
  rounded = "rounded-l-[12px]", // Default rounded corners
  placeholder = "Select a date", // Placeholder text
  label, // Dynamic label text
  onClick,
  secondary
}) => {
  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label className="text-[10px] font-[700] text-[#8A9191] capitalize satoshi">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div
        className={`flex items-center border border-white p-2 bg-[#FFFFFE]/50 text-black cursor-pointer satoshi ${rounded}`}
        onClick={onClick}
      >
        {/* Left Icon */}
        {showLeftIcon && (
          <span className="text-gray-500 size-fit">
            <div className="bg-white p-1 rounded-4xl size-fit">
              <img src={leftIcon} alt="Left Icon" className="w-5 h-4" />
            </div>
          </span>
        )}

        {/* Input */}
        <div className="grid w-full">
          <input
            type="text"
            value={value || placeholder}
            readOnly
            className="w-full px-2 outline-none cursor-pointer text-left text-[#8A9191] font-medium text-[14px] capitalize satoshi"
          />
          <p className="px-2 text-[#8A9191] text-[10px] font-medium">{secondary}</p>
        </div>

        {/* Right Icon */}
        {showRightIcon && (
          <span className="pl-2 text-gray-500">
            <img
              src={rightIcon}
              alt="Right Icon"
              className={`size-4 transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-180" : ""
              }`}
              onClick={onIconClick}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default PopUpInput;
