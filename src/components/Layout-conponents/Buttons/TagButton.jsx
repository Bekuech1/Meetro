import React from "react";
import LoadingSpinner from "../LoadingSpinner";

const VARIANTS = {
  "light-purple": {
    colors: {
      text: "text-[#7A60BF]",
      bgDefault: "bg-[#F3F0FB]",
      bgLoading: "bg-[#F3F0FB]",
      borderColor: "border-[#D9D1F1]",
    },
    spinnerColor: "border-[#7A60BF]",
  },
  "light-green": {
    colors: {
      text: "text-[#496A1B]",
      bgDefault: "bg-[#E6FEC4]",
      bgLoading: "bg-[#E6FEC4]",
      borderColor: "border-[#DAFEA7]",
    },
    spinnerColor: "border-[#496A1B]",
  },
  white: {
    colors: {
      text: "text-[#011F0F]",
      bgDefault: "bg-white hover:bg-[#E5E7E3]",
      bgLoading: "bg-white",
      borderColor: "border-[#E5E7E3]",
    },
    spinnerColor: "border-[#61B42D]",
  },
  green: {
    colors: {
      text: "text-white",
      bgDefault: "bg-[#61B42D] hover:bg-[#4B8B23]",
      bgLoading: "bg-[#61B42D]",
      borderColor: "border-[#7CE63A]",
    },
    spinnerColor: "border-white",
  },
  purple: {
    colors: {
      text: "text-white",
      bgDefault: "bg-[#7A60BF] hover:bg-[#5F4B95]",
      bgLoading: "bg-[#7A60BF]",
      borderColor: "border-[#866AD2]",
    },
    spinnerColor: "border-white",
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

const SIZES = {
  lg: {
    text: "text-[14px]",
    height: "h-9",
    padding: "px-2",
    iconSize: "size-4",
    spinnerSize: 20,
    minWidth: "min-w-[100px]",
  },
  md: {
    text: "text-[12px]",
    height: "h-[30px]",
    padding: "px-[6px]",
    iconSize: "size-4",
    spinnerSize: 16,
    minWidth: "min-w-[80px]",
  },
  sm: {
    text: "text-[10px]",
    height: "h-[22px]",
    padding: "px-1",
    iconSize: "size-4",
    spinnerSize: 10,
    minWidth: "min-w-[60px]",
  },
  xs: {
    text: "text-[10px]",
    height: "h-[18px]",
    padding: "px-1",
    iconSize: "size-1",
    spinnerSize: 10,
    minWidth: "min-w-[50px]",
  },
};

const TagButton = ({
  variant = "white",
  size = "md",
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

  const effectiveVariant = disabled ? "disabled" : variant;
  const variantConfig = VARIANTS[effectiveVariant] || VARIANTS["white"];
  const sizeConfig = SIZES[size] || SIZES["md"];

  const bgKey = isLoading
    ? "bgLoading"
    : state === "hover"
      ? "bgHover"
      : "bgDefault";

  const buttonClasses = [
    "font-medium flex items-center justify-center w-fit capitalize border rounded-[60px]",
    "transition-all duration-200 ease-in-out",
    sizeConfig.text,
    sizeConfig.height,
    sizeConfig.padding,
    sizeConfig.minWidth,
    variantConfig.colors[bgKey],
    variantConfig.colors.text,
    variantConfig.colors.borderColor,
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
        <div>
          <LoadingSpinner
            size={sizeConfig.spinnerSize}
            borderColor={variantConfig.spinnerColor}
          />
        </div>
      ) : hasContent ? (
        <div className={`w-fit flex items-center gap-1 h-fit`}>
          {leftImg && (
            <>
              {typeof leftImg === "string" ? (
                <img src={leftImg} alt="" className={sizeConfig.iconSize} />
              ) : (
                <span className={`[&>svg]:${sizeConfig.iconSize}`}>
                  {leftImg}
                </span>
              )}
            </>
          )}
          {text && <span className="whitespace-nowrap">{text}</span>}
          {rightImg && (
            <>
              {typeof rightImg === "string" ? (
                <img src={rightImg} alt="" className={sizeConfig.iconSize} />
              ) : (
                <span className={`[&>svg]:${sizeConfig.iconSize}`}>
                  {rightImg}
                </span>
              )}
            </>
          )}
        </div>
      ) : null}
    </button>
  );
};
export default TagButton;
