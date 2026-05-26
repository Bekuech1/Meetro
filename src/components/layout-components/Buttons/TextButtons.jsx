import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import { twMerge } from "tailwind-merge";

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
      bgDefault: "bg-white hover:bg-[#E5E7E3]",
      bgLoading: "bg-white",
      borderColor: "border-[#E5E7E3] hover:border-[#E5E7E3]",
    },
    spinnerColor: "border-[#61B42D]",
  },
  red: {
    colors: {
      text: "text-[#ffffff]",
      bgDefault: "bg-[#DB2863] hover:bg-[#C02156]",
      bgLoading: "bg-[#DB2863]",
      borderColor: "border-[#DB2863] hover:border-[#DB2863]",
    },
    spinnerColor: "border-[#ffffff]",
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
  iconSize = "size-4",
  smallButton = false,
  ...props
}) => {
  const isLoading = state === "loading";
  const isDisabled = disabled || isLoading;

  const effectiveVariant = disabled ? "disabled" : variant;
  const config = VARIANTS[effectiveVariant] || VARIANTS["primary"];

  const bgKey = isLoading
    ? "bgLoading"
    : state === "hover"
      ? "bgHover"
      : "bgDefault";

  // Define size-related variables first
  const sizeClasses = smallButton
    ? "text-[10px] h-6"
    : "text-base sm:text-sm h-[44px] sm:h-[36px]";

  const paddingSize = smallButton ? "px-2" : "px-4";
  const spinnerSize = smallButton ? 12 : 16;
  const contentGap = smallButton ? "gap-1" : "gap-[6px]";

  const buttonClasses = [
    "paytone flex items-center justify-center",
    "font-medium w-fit capitalize border min-w-[100px] rounded-[60px]",
    "transition-all duration-200 ease-in-out",
    sizeClasses,
    paddingSize,
    config.colors[bgKey],
    config.colors.text,
    config.colors.borderColor,
    isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95",
  ].join(" ");

  const hasContent = text || leftImg || rightImg;

  return (
    <button
      className={twMerge(buttonClasses, className)}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <div>
          <LoadingSpinner
            size={spinnerSize}
            borderColor={config.spinnerColor}
          />
        </div>
      ) : hasContent ? (
        <div className={`flex items-center ${contentGap} whitespace-nowrap`}>
          {/* Left icon */}
          {leftImg && (
            <React.Fragment>
              {typeof leftImg === "string" ? (
                <img src={leftImg} alt="left-icon" className={iconSize} />
              ) : (
                <span className={`[&>svg]:${iconSize}`}>{leftImg}</span>
              )}
            </React.Fragment>
          )}
          {text && <span>{text}</span>}
          {/* Right icon */}
          {rightImg && (
            <React.Fragment>
              {typeof rightImg === "string" ? (
                <img src={rightImg} alt="right-icon" className={iconSize} />
              ) : (
                <span className={`[&>svg]:${iconSize}`}>{rightImg}</span>
              )}
            </React.Fragment>
          )}
        </div>
      ) : null}
    </button>
  );
};

export default TextButton;
