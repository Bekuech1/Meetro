import ImageIcon from "@/assets/icons/ImageIcon";
import StrokeOutline from "@/assets/icons/strokeOutline";
import React, { useRef, useState } from "react";

export default function ImageInput({ size = "lg", onUpload }) {
  const inputRef = useRef(null);
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  // Sizes
  const sizes = {
    lg: "h-[349px] max-w-[349px]",
    md: "max-w-[200px] h-[200px]",
    sm: "max-w-[117px] h-[122px]",
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Set file
    onUpload?.(file);

    // Set file name
    setFileName(file.name);

    // Image preview url
    const previewUrl = URL.createObjectURL(file);

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
      } else {
        setProgress(p);
      }
    }, 200);
  };

  return (
    <div
      className={`w-full ${sizes[size]} ${size === "sm" ? "clip-star" : ""} satoshi rounded-[24px] border border-[#fbfbfb] bg-[#f9f9f9] flex items-center justify-center relative overflow-hidden backdrop-blur-[24px]`}
    >
      {/* Stroke outline */}
      {size === "sm" && <StrokeOutline />}
      {/* Idle state */}
      {stage === "idle" && (
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
      )}
      {/* Uploading state */}
      {stage === "uploading" && (
        <div
          className={`flex flex-col ${size === "sm" ? "gap-[2px]" : "gap-4"} items-center text-center`}
        >
          <div className="relative">
            <svg
              className={`${size === "sm" ? "size-6" : "size-12"} transform -rotate-90`}
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
      )}
      {/* Done state */}
      {stage === "done" && imgUrl && (
        <div className="w-full h-full relative">
          <img
            src={imgUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => inputRef.current.click()}
          />
          {/* replace button */}
          <button
            onClick={() => inputRef.current.click()}
            className={`${size === "sm" ? "hidden" : "flex"} absolute bottom-[14px] cursor-pointer right-[15px] size-8 bg-white items-center justify-center rounded-full shadow`}
          >
            <ImageIcon size="sm" />
          </button>
        </div>
      )}
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
