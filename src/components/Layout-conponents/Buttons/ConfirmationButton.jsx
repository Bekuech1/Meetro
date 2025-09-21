import React from "react";
import LoadingSpinner from "../LoadingSpinner";

// Configuration constants moved outside component
const VARIANTS = {
  "not-sure": {
    colors: {
      text: "text-[#7A60BF]",
      bgDefault: "bg-white hover:bg-[#F3F0FB]",
      bgLoading: "bg-white",
    },
    icon: "/timer-modal.svg",
    text: "not sure",
    spinnerColor: "border-[#7A60BF]",
  },
  going: {
    colors: {
      text: "text-[#61B42D]",
      bgDefault: "bg-white hover:bg-[#F7FFEC]",
      bgLoading: "bg-white",
    },
    icon: "/tick-circle.svg",
    text: "going",
    spinnerColor: "border-[#61B42D]",
  },
};

const ConfirmationButton = ({
  variant = "not-sure",
  state = "default",
  onClick,
  className = "",
  ...props
}) => {
  const config = VARIANTS[variant] || VARIANTS["not-sure"];
  const isLoading = state === "loading";

  // Map state to background color key
  const bgKey = isLoading
    ? "bgLoading"
    : "bgDefault";

  const buttonClasses = [
    "paytone flex flex-col rounded-[60px] gap-2 justify-center items-center",
    "px-1 py-3 h-fit min-h-20 w-full transition-all duration-200 ease-in-out",
    "drop-shadow-[0px_4px_16px_rgba(0,0,0,0.04)]",
    config.colors[bgKey],
    config.colors.text,
    isLoading
      ? "cursor-not-allowed bg-white"
      : "cursor-pointer active:scale-95",
    className,
  ].join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={isLoading ? undefined : onClick}
      disabled={isLoading}
      {...props}
    >
      {!isLoading ? (
        <>
          <img src={config.icon} alt="" className="size-8" />
          <span className="capitalize text-[12px] font-normal leading-4">
            {config.text}
          </span>
        </>
      ) : (
        <LoadingSpinner size={24} borderColor={config.spinnerColor} />
      )}
    </button>
  );
};

export default ConfirmationButton;