import { format } from "date-fns";
import { ArrowDown2, Calendar as Calendar2 } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import InputIcon from "@/assets/icons/InputIcon";

export default function SelectDate({
  date,
  setDate,
  placeholder = "Select Date",
  className = "",
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  // Close calendar
  const close = () => setShowCalendar(false);

  useEffect(() => {
    function handleClickOutside(e) {
      // if clicking outside both input and calendar -> close
      if (
        !inputRef.current?.contains(e.target) &&
        !calendarRef.current?.contains(e.target)
      )
        close();
    }
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up listener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Button */}
      <div
        ref={inputRef}
        onClick={() => setShowCalendar(s => !s)}
        className={`flex cursor-pointer satoshi gap-x-2 border input items-center hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] bg-[#f8f8f7] transition-all border-white rounded-[12px] px-[6px] py-[10px] md:py-[8px] max-h-11 md:max-h-9 backdrop-blur-xs ${className}`}
      >
        {/* Icon */}
        <InputIcon>
          <Calendar2 size={16} variant="Bold" />
        </InputIcon>
        {/* Placeholder */}
        <p
          className={`flex-1 md:text-sm font-medium ${date ? "text-[#001010]" : "text-[#B0B5B5]"} [&~svg]:fill-[#8A9191]`}
        >
          {date ? format(date, "EEE, d MMMM") : placeholder}
        </p>
        {/* Dropdown arrow*/}
        <ArrowDown2 size={16} variant="Outline" color="#8A9191" />
      </div>
      {/* Render calendar dropdown */}
      {showCalendar && (
        <Calendar
          date={date}
          ref={calendarRef}
          className="fixed w-full sm:w-auto bottom-0 z-40 sm:bottom-auto left-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2"
          onSelect={date => {
            setDate(date.toString());
            close();
          }}
          close={close}
        />
      )}
    </div>
  );
}
