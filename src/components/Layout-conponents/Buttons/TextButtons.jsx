import React from "react";
import LoadingSpinner from "../LoadingSpinner";

const VARIANTS = {
  primary: {
    colors: {
      text: "text-[#AEFC40]",
      bgDefault: "bg-[#011F0F] hover:bg-[#01160B]",
      bgLoading: "bg-[#011F0F]",
      borderColor: "border-[#011F0F] hover:border-[#01160B]",
    },
    spinnerColor: "border-[#AEFC40]",
  },
  secondary: {
    colors: {
      text: "text-[#011F0F]",
      bgDefault: "bg-[#AEFC40] hover:bg-[#DAFEA7]",
      bgLoading: "bg-[#AEFC40]",
      borderColor: "border-[#7CB32D] hover:border-[#7CB32D]",
    },
    spinnerColor: "border-[#011F0F]",
  },
  tertiary: {
    colors: {
      text: "text-[#011F0F]",
      bgDefault: "bg-white hover:bg-[#F0F0F0]",
      bgLoading: "bg-white",
      borderColor: "border-[#E5E7E3] hover:border-[#E5E7E3]",
    },
    spinnerColor: "border-[#61B42D]",
  },
  disabled: {
    colors: {
      text: "text-[#55695E]",
      bgDefault: "bg-[#B0BAB5]",
      bgLoading: "bg-[#B0BAB5]",
      borderColor: "border-[#B0BAB5]",
    },
    spinnerColor: "border-[#55695E]",
  },
};

const TextButton = ({
  variant = "primary",
  state = "default",
  disabled = false,
  onClick,
  className = "",
  text,
  leftImg,
  rightImg,
  ...props
}) => {
  const isLoading = state === "loading";
  const isDisabled = disabled || isLoading;
  
  // Use disabled variant design when button is disabled (but not loading)
  const effectiveVariant = disabled ? "disabled" : variant;
  const config = VARIANTS[effectiveVariant] || VARIANTS["primary"];

  const bgKey = isLoading 
    ? "bgLoading" 
    : state === "hover" 
      ? "bgHover" 
      : "bgDefault";

  const buttonClasses = [
    "paytone flex items-center justify-center",
    "px-4 py-[14px] sm:py-[10px] font-medium sm:text-sm text-base h-fit w-fit min-w-[100px] rounded-[60px] capitalize border",
    "transition-all duration-200 ease-in-out",
    config.colors[bgKey],
    config.colors.text,
    config.colors.borderColor,
    isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95",
    className,
  ].join(" ");

  const hasContent = text || leftImg || rightImg;

  return (
    <button
      className={buttonClasses}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <div className="py-[2px] sm:py-0">
          <LoadingSpinner size={20} borderColor={config.spinnerColor} />
        </div>
      ) : hasContent ? (
        <div className="w-fit flex items-center gap-[6px] h-fit">
          {leftImg && <img src={leftImg} alt="" className="size-4" />}
          {text && <span>{text}</span>}
          {rightImg && <img src={rightImg} alt="" className="size-4" />}
        </div>
      ) : null}
    </button>
  );
};

export default TextButton;