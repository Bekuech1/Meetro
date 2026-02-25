import React from "react";

const colorConfig = {
  bluegreen: "bg-[#077D8A] border-[#B2D7DB] text-white",
  skyblue: "bg-[#06727E] border-[#B2D7DB] text-[#E6F2F3]",
  green: "bg-[#61B42D] border-[#7CE63A] text-white",
  purple: "bg-[#7A60BF] border-[#866AD2] text-white",

};

const sizeConfig = {
  sm: "text-[10px]",
  lg: "text-xs",
};

const EventStatus = ({ color = "bluegreen", size = "sm", title }) => {
  const colorStyles = colorConfig[color];
  const sizeStyles = sizeConfig[size];

  return (
    <div
      className={`inline-flex size-fit items-center gap-[4px] font-medium px-1.5 py-0.5 border rounded-full transition-all ${colorStyles} ${sizeStyles} satoshi`}
      role="alert"
    >
      {/* Ellipse before the text */}
      <span className="size-1 rounded-full bg-current" />
      {/* Text */}
      <span className="font-medium capitalize">{title}</span>
    </div>
  );
};

export default EventStatus;
