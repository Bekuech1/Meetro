import {
  BiSolidCheckCircle,
  BiSolidInfoCircle,
  BiSolidXCircle,
} from "react-icons/bi";

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
      icon: <BiSolidXCircle className="text-[#DB2863]" />,
      textClass: "text-[#DB2863]",
    },
    success: {
      icon: <BiSolidCheckCircle className="text-[#7CB32D]" />,
      textClass: "text-[#7CB32D]",
    },
    helper: {
      icon: <BiSolidInfoCircle fill="#8A9191" />,
      textClass: "text-gray-700",
    },
  };

  // Decide what to render under input
  let statusContent = null;
  if (message) {
    const config =
      message.type === "error" ? statusConfig.error : statusConfig.success;
    statusContent = (
      <>
        {config.icon}
        <span
          className={`${config.textClass} font-medium text-[10px] leading-[14px]`}
        >
          {message.text}
        </span>
      </>
    );
  } else if (helper) {
    statusContent = (
      <>
        {statusConfig.helper.icon}
        <span
          className={`${statusConfig.helper.textClass} font-medium text-[10px] leading-[14px]`}
        >
          {helper}
        </span>
      </>
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
          {labelIcon && labelIcon}
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
