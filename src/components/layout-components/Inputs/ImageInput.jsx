import ImageIcon from "@/assets/icons/ImageIcon";
import StrokeOutline from "@/assets/icons/StrokeOutline";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ImageInput({
  size = "lg",
  onUpload,
  showUpload = true,
  className = "",
  imgUrl,
  setImgUrl,
}) {
  const inputRef = useRef(null);
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  // Sizes
  const sizes = {
    lg: "aspect-square max-w-[349px]",
    md: "max-w-[200px] aspect-square",
    sm: "max-w-[117px] h-[122px]",
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Image preview url
    const previewUrl = URL.createObjectURL(file);

    // Alternate image input
    if (!showUpload) return;

    // Set file name
    setFileName(file.name);

    // Set image preview
    setImgUrl(previewUrl);

    // simulate upload
    setStage("uploading");
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      if (p >= 100) {
        clearInterval(interval);
        setProgress(100);
        setStage("done");
        // Set file
        onUpload?.({
          file,
          previewUrl,
        });
      } else {
        setProgress(p);
      }
    }, 200);
  };

  return (
    <div
      className={twMerge(
        `w-full satoshi rounded-[24px] border-2 border-[#fbfbfb] bg-[#f9f9f9] flex items-center justify-center relative overflow-hidden backdrop-blur-[24px]`,
        sizes[size],
        size === "sm" && "clip-star",
        className && className
      )}
    >
      {/* Stroke outline */}
      {size === "sm" && <StrokeOutline />}
      {/* Show uploading UI if uploading */}
      {stage === "uploading" ? (
        <div
          className={twMerge(
            `flex flex-col items-center text-center gap-4`,
            size === "sm" && "gap-[2px]"
          )}
        >
          <div className="relative">
            <svg
              className={twMerge(
                `size-12 transform -rotate-90`,
                size === "sm" && "size-6"
              )}
              viewBox="0 0 36 36"
            >
              {/* background circle */}
              <circle
                cx="18"
                cy="18"
                r="15"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className={`text-[#E0F5D3] ${size === "sm" ? "hidden" : "inline-block"}`}
              />
              {/* progress circle */}
              <circle
                cx="18"
                cy="18"
                r="15"
                stroke="currentColor"
                strokeWidth={`${size === "sm" ? "4" : "6"}`}
                fill="none"
                strokeDasharray="94.2"
                strokeDashoffset={(1 - progress / 100) * 94.2}
                strokeLinecap="round"
                className="text-[#61B42D] transition-all duration-300 ease-in-out"
              />
            </svg>
            <span
              className={`${size === "sm" ? "hidden" : "inline-block"} text-[#61B42D] text-[9px] absolute top-1/2 left-1/2 -translate-1/2 font-semibold`}
            >
              {progress}%
            </span>
          </div>
          <div>
            <p
              className={`${size === "sm" ? "text-[10px] leading-[14px]" : "text-xs leading-[18px]"}  font-bold`}
            >
              Uploading...
            </p>
            {size !== "sm" && (
              <p className="text-xs leading-[18px] font-medium text-[#8A9191] truncate w-36">
                {fileName}
              </p>
            )}
          </div>
        </div>
      ) : imgUrl ? (
        <React.Fragment>
          <img
            src={imgUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          {/* replace button */}
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              inputRef.current?.click();
            }}
            aria-label="Replace image"
            title="Replace image"
            className={`${size === "sm" ? "hidden" : "flex"} absolute bottom-[14px] right-[15px] size-8 cursor-pointer bg-white/95 backdrop-blur-sm items-center justify-center rounded-full shadow-md border border-[#E5E7E3] transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61B42D] focus-visible:ring-offset-2`}
          >
            <ImageIcon size="sm" />
          </button>
        </React.Fragment>
      ) : stage === "idle" ? (
        <button
          onClick={() => inputRef.current.click()}
          className="flex flex-col cursor-pointer items-center w-full h-full justify-center text-gray-600"
        >
          <div
            className={`${size === "sm" ? "size-8 mb-1" : "size-10 mb-4"} bg-white rounded-full flex items-center justify-center p-2`}
          >
            <ImageIcon size={size} />
          </div>
          <span
            className={`${size === "sm" ? "text-[10px] leading-[14px]" : "text-xs leading-[18px]"} font-bold `}
          >
            Click to Upload
          </span>
        </button>
      ) : null}
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onClick={e => e.stopPropagation()}
        onChange={handleFileChange}
      />
    </div>
  );
}
