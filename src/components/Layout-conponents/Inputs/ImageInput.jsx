import React, { useRef, useState } from "react";

export default function ImageInput({ size = "lg", onUpload }) {
  const inputRef = useRef(null);
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  const sizes = {
    lg: "h-[349px] max-w-[349px]",
    md: "max-w-[200px] h-[200px]",
    sm: "max-w-[115px] h-[120px]",
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
      {size === "sm" && (
        <svg
          viewBox="0 0 116 122"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
        >
          <path
            d="M48.7077 3.66611C54.5497 0.111295 61.8866 0.111299 67.7287 3.66611L71.4976 5.95947C73.89 7.41522 76.5847 8.30233 79.374 8.55245L83.8055 8.94983C90.558 9.55535 96.4221 13.8451 99.0438 20.0973L100.885 24.4887C101.951 27.0305 103.578 29.2986 105.643 31.1236L109.255 34.3151C114.265 38.7419 116.461 45.5488 114.983 52.0689L113.876 56.9565C113.273 59.6184 113.273 62.3816 113.876 65.0435L114.983 69.9311C116.461 76.4512 114.265 83.258 109.255 87.6849L105.643 90.8764C103.578 92.7014 101.951 94.9695 100.885 97.5113L99.0438 101.903C96.422 108.155 90.558 112.445 83.8055 113.05L79.374 113.448C76.5847 113.698 73.89 114.585 71.4976 116.041L67.7287 118.334C61.8866 121.889 54.5497 121.889 48.7077 118.334L44.9387 116.041C42.5463 114.585 39.8516 113.698 37.0623 113.448L32.6308 113.05C25.8784 112.445 20.0143 108.155 17.3925 101.903L15.5509 97.5113C14.4851 94.9695 12.8587 92.7014 10.7934 90.8764L7.18155 87.6849C2.17177 83.2581 -0.0246102 76.4512 1.45292 69.9311L2.56049 65.0435C3.16372 62.3816 3.16372 59.6184 2.56049 56.9565L1.45292 52.0689C-0.02461 45.5488 2.17177 38.7419 7.18155 34.3151L10.7934 31.1236C12.8587 29.2986 14.4851 27.0305 15.5509 24.4887L17.3925 20.0973C20.0143 13.8451 25.8784 9.55535 32.6309 8.94983L37.0623 8.55245C39.8516 8.30233 42.5463 7.41521 44.9387 5.95946L48.7077 3.66611Z"
            stroke="var(--Foundation-Accent-2-accent-2-50, #E6F2F3)"
            strokeWidth="2"
          />
        </svg>
      )}

      {stage === "idle" && (
        <button
          onClick={() => inputRef.current.click()}
          className="flex flex-col cursor-pointer items-center text-gray-600"
        >
          <div
            className={`${size === "sm" ? "size-8 mb-1" : "size-10 mb-4"} bg-white rounded-full flex items-center justify-center p-2`}
          >
            <svg
              className={`${size === "sm" ? "h-4 w-4" : "h-6 w-6"}`}
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M22.5201 16.82L19.3901 9.50002C18.8201 8.16002 17.9701 7.40002 17.0001 7.35002C16.0401 7.30002 15.1101 7.97002 14.4001 9.25002L12.5001 12.66C12.1001 13.38 11.5301 13.81 10.9101 13.86C10.2801 13.92 9.65014 13.59 9.14014 12.94L8.92014 12.66C8.21014 11.77 7.33014 11.34 6.43014 11.43C5.53014 11.52 4.76014 12.14 4.25014 13.15L2.52014 16.6C1.90014 17.85 1.96014 19.3 2.69014 20.48C3.42014 21.66 4.69014 22.37 6.08014 22.37H18.8401C20.1801 22.37 21.4301 21.7 22.1701 20.58C22.9301 19.46 23.0501 18.05 22.5201 16.82Z"
                fill="#077D8A"
              />
              <path
                d="M7.46984 8.38C9.33657 8.38 10.8498 6.86672 10.8498 5C10.8498 3.13327 9.33657 1.62 7.46984 1.62C5.60312 1.62 4.08984 3.13327 4.08984 5C4.08984 6.86672 5.60312 8.38 7.46984 8.38Z"
                fill="#077D8A"
              />
            </svg>
          </div>
          <span
            className={`${size === "sm" ? "text-[10px] leading-[14px]" : "text-xs leading-[18px]"} font-bold `}
          >
            Click to Upload
          </span>
        </button>
      )}

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
            <svg
              width="17"
              height="16"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M22.5201 16.82L19.3901 9.50002C18.8201 8.16002 17.9701 7.40002 17.0001 7.35002C16.0401 7.30002 15.1101 7.97002 14.4001 9.25002L12.5001 12.66C12.1001 13.38 11.5301 13.81 10.9101 13.86C10.2801 13.92 9.65014 13.59 9.14014 12.94L8.92014 12.66C8.21014 11.77 7.33014 11.34 6.43014 11.43C5.53014 11.52 4.76014 12.14 4.25014 13.15L2.52014 16.6C1.90014 17.85 1.96014 19.3 2.69014 20.48C3.42014 21.66 4.69014 22.37 6.08014 22.37H18.8401C20.1801 22.37 21.4301 21.7 22.1701 20.58C22.9301 19.46 23.0501 18.05 22.5201 16.82Z"
                fill="#077D8A"
              />
              <path
                d="M7.46984 8.38C9.33657 8.38 10.8498 6.86672 10.8498 5C10.8498 3.13327 9.33657 1.62 7.46984 1.62C5.60312 1.62 4.08984 3.13327 4.08984 5C4.08984 6.86672 5.60312 8.38 7.46984 8.38Z"
                fill="#077D8A"
              />
            </svg>
          </button>
        </div>
      )}

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
