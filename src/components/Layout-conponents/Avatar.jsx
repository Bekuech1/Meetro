import React from "react";
import clsx from "clsx";

// Avatar sizes config
const SIZES = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-[10px]",
  md: "w-12 h-12 text-[14px]",
  lg: "w-16 h-16 text-[14px]",
  xl: "w-24 h-24 text-2xl",
};

// Gradient background for initials
const INITIAL_BG =
  "bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold flex items-center justify-center rounded-full";

const Avatar = ({
  type = "profile", // profile | initial | group
  src, // image url
  name = "", // used for initials
  size = "md", // xs | sm | md | lg | xl
  count, // only for "group"
  groupMembers = [], // array of avatars for group
  className = "",
}) => {
  // Profile avatar
  if (type === "profile") {
    return (
      <img
        src={src}
        alt={name}
        className={clsx("rounded-full object-cover", SIZES[size], className)}
      />
    );
  }

  // Initial avatar
  if (type === "initial") {
    const initials = name
      ? name
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase()
      : "??";

    return (
      <div className={clsx(INITIAL_BG, SIZES[size], "uppercase", className)}>
        {initials}
      </div>
    );
  }

  // Group avatar
  if (type === "group") {
    return (
      <div className="flex items-center bg-[#E5E7E3] rounded-[100px] border border-[#F9F9F9] backdrop-blur-[20px]">
        <div className="flex -space-x-4">
          {groupMembers.slice(0, 2).map((member, i) =>
            member.src ? (
              <img
                key={i}
                src={member.src}
                alt={member.name}
                className={clsx("rounded-full ", SIZES[size])}
              />
            ) : (
              <div key={i} className={clsx(INITIAL_BG, SIZES[size], "")}>
                {member.name[0]}
              </div>
            )
          )}
        </div>
        {count && (
          <span className={clsx("ml-2 h-fit font-bold text-[#001010]", SIZES[size], className)}>
            +{count}
          </span>
        )}
      </div>
    );
  }

  return null;
};

export default Avatar;
