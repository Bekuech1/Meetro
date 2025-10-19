import TriangleAlert from "@/assets/icons/TriangleAlert";
import { InfoCircle, TickCircle } from "iconsax-reactjs";
import { X } from "lucide-react";
import React from 'react'

const typeConfig = {
  error: {
    icon: InfoCircle,
    base: "text-[#781636] [&>div>svg]:text-[#DB2863] border-[#FBEAEF] bg-[#FBEAEF]",
    outline:
      "text-[#781636] [&>div>svg]:text-[#DB2863] border border-[#DB2863] bg-[#FBEAEF]",
    filled: "text-white bg-[#DB2863] border-[#DB2863]",
  },
  info: {
    icon: InfoCircle,
    base: "text-[#4A3A74] [&>div>svg]:text-[#7A60BF] border-[#F3F0FB] bg-[#F3F0FB]",
    outline:
      "text-[#4A3A74] [&>div>svg]:text-[#7A60BF] border border-[#7A60BF] bg-[#F3F0FB]",
    filled: "text-white bg-[#7A60BF] border-[#7A60BF]",
  },
  warning: {
    icon: TriangleAlert,
    base: "text-[#997404] [&>div>svg]:text-[#FFC107] bg-[#FFC1073D]",
    outline:
      "text-[#997404] [&>div>svg]:text-[#FFC107] border border-[#FFC107] bg-[#FFC1073D]",
    filled: "text-[#212529] bg-[#FFC107] border-[#FFC107]",
  },
  success: {
    icon: TickCircle,
    base: "text-[#4B8B23] border-[#F3FFEC] bg-[#F3FFEC]",
    outline: "text-[#4B8B23] border border-[#61B42D] bg-[#F3FFEC]",
    filled: "text-white bg-[#61B42D] border-[#61B42D]",
  },
};

const sizeConfig = {
  sm: "p-2",
  lg: "px-3 py-4",
};

const Alert = ({
  type = "info",
  size = "sm",
  option = "default",
  onClick,          // close handler
  button,      // 👈 optional custom close button (IconButton or any element)
  title,
  subtitle,
}) => {
  const typeStyles = typeConfig[type];
  const sizeStyles = sizeConfig[size];

  let styles = "";
  if (option === "default") styles = typeStyles.base;
  if (option === "outline") styles = typeStyles.outline;
  if (option === "filled") styles = typeStyles.filled;

  const IconComponent = typeStyles.icon;

  const getIconProps = () => ({
    size: 24,
    variant: "Bold",
    className: "min-w-6",
  });

  return (
    <div
      className={`flex place-items-center border ${sizeStyles} ${styles} rounded-[16px] md:rounded-[100px] transition-all h-fit w-full satoshi`}
      role="alert"
    >
      <div className="w-full flex place-items-center gap-2">
        <IconComponent {...getIconProps()} />
        <div className="text-sm flex flex-col gap-y-1">
          <h3 className="font-bold capitalize">{title}</h3>
          {subtitle && <span className="font-normal">{subtitle}</span>}
        </div>
      </div>

      {/* 👇 Close button logic */}
      {onClick && (
        button ? (
          // Use custom close button if provided
          React.cloneElement(button, { onClick })
        ) : (
          // Default X button
          <button
            className="cursor-pointer hover:opacity-70 ml-2"
            onClick={onClick}
          >
            <X size={20} />
          </button>
        )
      )}
    </div>
  );
};

export default Alert;
