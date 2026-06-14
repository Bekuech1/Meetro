import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const OTP_LENGTH = 6;

export default function OTP({ onChange, disabled = false, error = false }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [focusedIdx, setFocusedIdx] = useState(null);
  const inputsRef = useRef([]);

  // Handle input change
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[0];
    setOtp(newOtp);
    if (onChange) onChange(newOtp.join(""));
    if (val && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  // Handle key down events for navigation and deletion
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
        if (onChange) onChange(newOtp.join(""));
      } else if (idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1].focus();
    } else if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  // Allow pasting all OTP digits at once
  const handlePaste = (e, idx) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!paste) return;
    e.preventDefault();
    const newOtp = [...otp];
    let pasteIdx = idx;
    for (
      let i = 0;
      i < paste.length && pasteIdx < OTP_LENGTH;
      i++, pasteIdx++
    ) {
      newOtp[pasteIdx] = paste[i];
    }
    setOtp(newOtp);
    if (onChange) onChange(newOtp.join(""));
    // Focus the last filled input
    if (paste.length > 0) {
      const nextFocus = Math.min(idx + paste.length - 1, OTP_LENGTH - 1);
      inputsRef.current[nextFocus]?.focus();
    }
  };

  // Handle focus and blur to manage focusedIdx state
  const handleFocus = idx => setFocusedIdx(idx);
  const handleBlur = () => setFocusedIdx(null);

  return (
    <div className="flex gap-2.5 items-center">
      {otp.map((digit, idx) => (
        <div
          key={idx}
          className="relative flex items-center justify-center w-12 h-12"
        >
          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            onFocus={() => handleFocus(idx)}
            onBlur={handleBlur}
            onPaste={e => handlePaste(e, idx)}
            ref={el => (inputsRef.current[idx] = el)}
            disabled={disabled}
            className={twMerge(
              `w-12 h-12 text-center text-[#001010] text-[24px] leading-8 backdrop-blur-sm border rounded-[12px] outline-0 transition-all z-10 relative bg-[#F1F1F1] border-white `,
              digit &&
                otp.join("").length === OTP_LENGTH &&
                "bg-[#E6FEC4] border-[#D1E7B0]",
              error &&
                otp.join("").length === OTP_LENGTH &&
                "text-[#5C112A] bg-[#FBEAEF] border-[#F4BCCF]"
            )}
          />
          {!digit && focusedIdx !== idx && (
            <span className="absolute w-3 h-3 rounded-full bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none block" />
          )}
        </div>
      ))}
    </div>
  );
}
