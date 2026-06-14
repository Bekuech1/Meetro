import StrokeOutline from "@/assets/icons/StrokeOutline";
import { randomProfileImage } from "@/lib/utils";
import React, { useMemo } from "react";

// Avatar sizes config
const SIZES = {
  xxxs: "w-4 h-4",
  xxs: "w-[17px] h-[18px]",
  xs: "w-[23px] h-6",
  sm: "w-[31px] h-8",
  md: "w-[38px] h-10",
  lg: "w-[46px] h-12",
  xl: "w-[63px] h-[66px]",
};

const Avatar = ({
  src, // image url
  size = "md", // xs | sm | md | lg | xl
  className = "", // classes
  alt = "profile-image", // alt text
}) => {
  // Cache so it doesn't change on re-renders
  const defaultSrc = useMemo(() => randomProfileImage(), []);
  const clipPathId = useMemo(
    () => `star-clip-${Math.random().toString(36).slice(2, 10)}`,
    []
  );

  return (
    <div className={`relative overflow-hidden ${SIZES[size]} ${className}`}>
      {src ? (
        <React.Fragment>
          <svg width="0" height="0">
            <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
              <path
                d="M48.7077 3.66611C54.5497 0.111295 61.8866 0.111299 67.7287 3.66611L71.4976 5.95947C73.89 7.41522 76.5847 8.30233 79.374 8.55245L83.8055 8.94983C90.558 9.55535 96.4221 13.8451 99.0438 20.0973L100.885 24.4887C101.951 27.0305 103.578 29.2986 105.643 31.1236L109.255 34.3151C114.265 38.7419 116.461 45.5488 114.983 52.0689L113.876 56.9565C113.273 59.6184 113.273 62.3816 113.876 65.0435L114.983 69.9311C116.461 76.4512 114.265 83.258 109.255 87.6849L105.643 90.8764C103.578 92.7014 101.951 94.9695 100.885 97.5113L99.0438 101.903C96.422 108.155 90.558 112.445 83.8055 113.05L79.374 113.448C76.5847 113.698 73.89 114.585 71.4976 116.041L67.7287 118.334C61.8866 121.889 54.5497 121.889 48.7077 118.334L44.9387 116.041C42.5463 114.585 39.8516 113.698 37.0623 113.448L32.6308 113.05C25.8784 112.445 20.0143 108.155 17.3925 101.903L15.5509 97.5113C14.4851 94.9695 12.8587 92.7014 10.7934 90.8764L7.18155 87.6849C2.17177 83.2581 -0.0246102 76.4512 1.45292 69.9311L2.56049 65.0435C3.16372 62.3816 3.16372 59.6184 2.56049 56.9565L1.45292 52.0689C-0.02461 45.5488 2.17177 38.7419 7.18155 34.3151L10.7934 31.1236C12.8587 29.2986 14.4851 27.0305 15.5509 24.4887L17.3925 20.0973C20.0143 13.8451 25.8784 9.55535 32.6309 8.94983L37.0623 8.55245C39.8516 8.30233 42.5463 7.41521 44.9387 5.95946L48.7077 3.66611Z"
                transform="scale(0.00855 0.0082)"
              />
            </clipPath>
          </svg>
          <img
            src={src}
            alt={src ? alt : ""}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            className={`block ${SIZES[size]} object-cover`}
            style={{
              clipPath: `url(#${clipPathId})`,
              WebkitClipPath: `url(#${clipPathId})`,
            }}
          />
          <StrokeOutline />
        </React.Fragment>
      ) : (
        <img
          alt={alt}
          src={defaultSrc}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className="block h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default Avatar;
