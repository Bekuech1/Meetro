import { CloseCircle, TickCircle, InfoCircle } from "iconsax-reactjs";
import React from "react";

export default function FormGroup({
  label,
  labelIcon,
  children,
  helper,
  message,
}) {
  // Status configuration (icon + text color)
  const statusConfig = {
    error: {
      icon: <CloseCircle size={16} color="#DB2863" variant="Bold" />,
      textClass: "text-[#DB2863]",
    },
    success: {
      icon: <TickCircle size={16} color="#7CB32D" variant="Bold" />,
      textClass: "text-[#7CB32D]",
    },
    helper: {
      icon: <InfoCircle size={16} color="#8A9191" variant="Bold" />,
      textClass: "text-[#001010]",
    },
  };

  // Decide what to render under input
  let statusContent = null;
  if (message) {
    const config =
      message.type === "error" ? statusConfig.error : statusConfig.success;
    statusContent = (
      <React.Fragment>
        {config.icon}
        <span
          className={`${config.textClass} font-medium text-[10px] leading-[14px]`}
        >
          {message.text}
        </span>
      </React.Fragment>
    );
  } else if (helper) {
    statusContent = (
      <React.Fragment>
        {statusConfig.helper.icon}
        <span
          className={`${statusConfig.helper.textClass} font-medium text-[10px] leading-[14px]`}
        >
          {helper}
        </span>
      </React.Fragment>
    );
  }

  return (
    <div
      className={`flex satoshi flex-col gap-y-1 ${message?.type === "error" ? "[&_.input]:border-[#DB2863]" : message?.type === "success" ? "[&_.input]:border-[#7CB32D]" : "[&_.input]:focus-within:border-[#7CB32D]"}`}
    >
      {/* Label */}
      {label && (
        <label className="flex justify-between gap-x-2 items-center [&>svg]:fill-[#8A9191]">
          <span className="text-xs font-bold">{label}</span>
          {/* Label icon */}
          {labelIcon && (
            <React.Fragment>
              {typeof labelIcon === "string" ? (
                <img src={labelIcon} alt="label-icon" className="size-4" />
              ) : (
                <span className="[&>svg]:size-4">{labelIcon}</span>
              )}
            </React.Fragment>
          )}
        </label>
      )}
      {children}
      {/* Display message */}
      {statusContent && (
        <div className="flex items-center gap-x-1">{statusContent}</div>
      )}
    </div>
  );
}
