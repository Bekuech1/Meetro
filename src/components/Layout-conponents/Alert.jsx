import React from "react";
import { CloseCircle, InfoCircle, Warning2, TickCircle } from "iconsax-reactjs";

const typeConfig = {
  error: {
    iconColor: "#DB2863",
    closeColor: "#781636",
    icon: InfoCircle,
    base: "text-[#781636] border-[#FBEAEF] bg-[#FBEAEF]",
    outline: "text-[#781636] border border-[#DB2863] bg-[#FBEAEF]",
    filled: "text-white bg-[#DB2863] border-[#DB2863]",
  },
  info: {
    iconColor: "#7A60BF",
    closeColor: "#4A3A74",
    icon: InfoCircle,
    base: "text-[#4A3A74] border-[#F3F0FB] bg-[#F3F0FB]",
    outline: "text-[#4A3A74] border border-[#7A60BF] bg-[#F3F0FB]",
    filled: "text-white bg-[#7A60BF] border-[#7A60BF]",
  },
  warning: {
    iconColor: "#FFC107", 
    closeColor: "#997404", 
    icon: Warning2,
    base: "text-[#997404] border-[#FFC1073D] bg-[#FFC1073D]",
    outline: "text-[#997404] border border-[#FFC107] bg-[#FFC1073D]",
    filled: "text-white bg-[#FFC107] border-[#FFC107]",
  },
  success: {
    iconColor: "#61B42D", 
    closeColor: "#4B8B23", 
    icon: TickCircle,
    base: "text-[#4B8B23] border-[#F3FFEC] bg-[#F3FFEC]",
    outline: "text-[#4B8B23] border border-[#61B42D] bg-[#F3FFEC]",
    filled: "text-white bg-[#61B42D] border-[#61B42D]",
  },
};

const sizeConfig = {
  sm: " p-2",
  lg: " px-3 py-4",
};

const Alert = ({
  type = "info",
  size = "sm",
  option = "default",
  onClick,
  children,
}) => {
  const typeStyles = typeConfig[type];
  const sizeStyles = sizeConfig[size];
  
  // Get the appropriate colors based on option
  const getIconColor = () => {
    if (option === "filled") return "white";
    return typeStyles.iconColor;
  };
  
  const getCloseColor = () => {
    if (option === "filled") return "white";
    return typeStyles.closeColor;
  };

  let styles = "";
  if (option === "default") styles = typeStyles.base;
  if (option === "outline") styles = typeStyles.outline;
  if (option === "filled") styles = typeStyles.filled;

  // Dynamic icon component
  const IconComponent = typeStyles.icon;
  
  // Handle different icon props based on library
  const getIconProps = () => {
    if (IconComponent === InfoCircle) {
      return {
        size: "16",
        color: getIconColor(),
        variant: "Bold"
      };
    }
    // For lucide-react icons (Triangle, CheckCircle2)
    return {
      className: "h-4 w-4",
      color: getIconColor()
    };
  };

  return (
    <div
      className={`flex place-items-center border ${sizeStyles} ${styles} rounded-[100px] transition-all h-fit w-full max-w-[400px] satoshi text-[14px] font-bold`}
      role="alert"
    >
      <div className="w-full flex place-items-center gap-2">
        <IconComponent {...getIconProps()} />
        <span>{children}</span>
      </div>
      <button className="cursor-pointer" onClick={onClick}>
        <CloseCircle size="16" color={getCloseColor()} />
      </button>
    </div>
  );
};

export default Alert;