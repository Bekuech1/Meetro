import ImageIcon from "@/assets/icons/ImageIcon";
import StrokeOutline from "@/assets/icons/StrokeOutline";

export default function EventImage({
  size = "lg",
  imageUrl,
  className = "",
  altText = "Event image",
}) {
  // Sizes
  const sizes = {
    lg: "aspect-square max-w-[349px]",
    md: "max-w-[200px] aspect-square",
    sm: "max-w-[117px] h-[122px]",
  };

  return (
    <div
      className={`w-full ${sizes[size]} ${className} ${size === "sm" ? "clip-star" : ""} satoshi rounded-[24px] border border-[#fbfbfb] bg-[#f9f9f9] flex items-center justify-center relative overflow-hidden backdrop-blur-[24px]`}
    >
      {/* Stroke outline */}
      {size === "sm" && <StrokeOutline />}

      {imageUrl ? (
        <div className="w-full h-full relative">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full block object-cover"
          />
          <div
            className={`${size === "sm" ? "hidden" : "flex"} absolute bottom-[14px] right-[15px] size-8 bg-white items-center justify-center rounded-full shadow`}
          >
            <ImageIcon size="sm" />
          </div>
        </div>
      ) : (
        <div
          className={
            "text-gray-400 text-center font-bold flex flex-col items-center justify-center"
          }
        >
          <p
            className={`${size === "sm" ? "text-[10px] leading-[14px]" : "text-xs leading-[18px]"} font-medium`}
          >
            No image available
          </p>
        </div>
      )}
    </div>
  );
}
