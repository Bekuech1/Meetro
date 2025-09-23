import React from "react";

const Tooltip = ({ 
  size = "small", 
  arrowPosition = "bottom", 
  text = "Your tooltip text goes here",
  visible = true
}) => {
  // Size variants
  const sizeClasses = {
    small: "w-fit px-2 py-1 text-[10px] leading-[14px]",
    large: "w-[300px] p-[10px] text-[10px] leading-[16px]"
  };

  // Arrow positioning classes
  const getArrowClasses = (position) => {
    const baseArrow = "after:content-[''] after:absolute after:w-0 after:h-0";
    
    switch (position) {
      case "top":
        return `${baseArrow} 
                after:top-[-8px] after:left-1/2 after:-translate-x-1/2
                after:border-l-[8px] after:border-r-[8px] after:border-b-[8px]
                after:border-l-transparent after:border-r-transparent after:border-b-white`;
      
      case "right":
        return `${baseArrow}
                after:right-[-8px] after:top-1/2 after:-translate-y-1/2
                after:border-t-[8px] after:border-b-[8px] after:border-l-[8px]
                after:border-t-transparent after:border-b-transparent after:border-l-white`;
      
      case "left":
        return `${baseArrow}
                after:left-[-8px] after:top-1/2 after:-translate-y-1/2
                after:border-t-[8px] after:border-b-[8px] after:border-r-[8px]
                after:border-t-transparent after:border-b-transparent after:border-r-white`;
      
      case "bottom":
      default:
        return `${baseArrow}
                after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2
                after:border-l-[8px] after:border-r-[8px] after:border-t-[8px]
                after:border-l-transparent after:border-r-transparent after:border-t-white`;
    }
  };

  // Don't render anything if not visible
  if (!visible) {
    return null;
  }

  return (
    <div
      className={`relative h-fit bg-white flex items-center justify-center rounded-[8px] drop-shadow-[0px_10px_22px_rgba(45,77,108,0.15)] ${sizeClasses[size]} ${getArrowClasses(arrowPosition)}`}
    >
      <p className="satoshi text-[#001010] font-medium text-center">
        {text}
      </p>
    </div>
  );
};

export default Tooltip;