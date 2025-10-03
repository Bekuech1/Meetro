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
      bgDefault: "bg-white hover:bg-[#E5E7E3]",
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

const IconButton = ({
  variant = "primary",
  state = "default",
  disabled = false,
  onClick,
  className = "",
  icon,
  children,
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

  const sizeClasses = smallButton
    ? "p-1 size-6"
    : "p-[10px] sm:p-2 size-[44px] sm:size-[36px]";

  const buttonClasses = [
    "paytone flex items-center justify-center",
    "font-medium w-fit h-fit capitalize border rounded-[60px]",
    "transition-all duration-200 ease-in-out",
    sizeClasses,
    config.colors[bgKey],
    config.colors.text,
    config.colors.borderColor,
    isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-95",
    className,
  ].join(" ");

  const hasContent = icon || children;

  const spinnerSize = smallButton ? 14 : 20;

  const iconSize = smallButton ? "size-[14px]" : "size-6";

  return (
    <button
      className={buttonClasses}
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
        <div className={`flex items-center justify-center size-fit`}>
          {typeof icon === "string" ? (
            <img src={icon} alt="" className={iconSize} />
          ) : (
            <span className={`[&>svg]:${iconSize}`}>{icon}</span>
          )}
          {children}
        </div>
      ) : null}
    </button>
  );
};
export default IconButton;
