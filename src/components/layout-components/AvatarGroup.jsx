import Avatar from "./Avatar";

// Text sizes config
const TEXT_SIZES = {
  xs: "text-[10px] leading-[14px] max-h-[22px]",
  sm: "text-[10px] leading-[14px] max-h-7",
  md: "text-sm max-h-9",
  lg: "text-sm max-h-9",
  xl: "text-base max-h-13",
};

// Image size
const IMAGE_SIZES = {
  xs: "xxs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

export default function AvatarGroup({ size = "md", count = 0, src = [] }) {
  return (
    <div
      className={`border satoshi border-[#F9F9F9] ${TEXT_SIZES[size]} items-center bg-[#E5E7E3] inline-flex gap-x-[2px] p-[2px] rounded-full pr-1`}
    >
      <div className="flex items-center">
        <Avatar size={IMAGE_SIZES[size]} src={src[0]} />
        <Avatar
          size={IMAGE_SIZES[size]}
          src={src[1]}
          className="-ml-[8px] z-[4]"
        />
      </div>
      <span className="font-bold">+{count}</span>
    </div>
  );
}
