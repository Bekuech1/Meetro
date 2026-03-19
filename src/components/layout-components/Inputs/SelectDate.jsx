import { format } from "date-fns";
import { ArrowDown2, Calendar as Calendar2 } from "iconsax-reactjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const parsedDate = date ? new Date(date) : null;
  const hasValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());
  const [coords, setCoords] = useState(null);

  // Close calendar
  const close = () => setShowCalendar(false);

  useLayoutEffect(() => {
    if (showCalendar && inputRef?.current) {
      const updatePosition = () => {
        if (window.innerWidth < 640) {
          setCoords(null);
          return;
        }
        const rect = inputRef.current.getBoundingClientRect();
        setCoords({
          top: rect.top + rect.height / 2,
          left: rect.left,
        });
      };
      
      updatePosition();
      
      const onScroll = (e) => {
        // If the scroll target is the calendar itself, don't close
        if (calendarRef.current && calendarRef.current.contains(e.target)) return;
        
        // If the scroll target is inside a portaled dropdown belonging to this tree, ignore
        if (e.target.closest && e.target.closest('[data-dropdown-portal="true"]')) return;

        close();
      };
      
      window.addEventListener("resize", updatePosition);
      document.addEventListener("scroll", onScroll, { capture: true, passive: true });
      return () => {
        window.removeEventListener("resize", updatePosition);
        document.removeEventListener("scroll", onScroll, { capture: true });
      };
    }
  }, [showCalendar]);

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
          className={`flex-1 md:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis  ${date ? "text-[#001010]" : "text-[#B0B5B5]"} [&~svg]:fill-[#8A9191]`}
        >
          {hasValidDate ? format(parsedDate, "EEE, d MMM, yyyy") : placeholder}
        </p>
        {/* Dropdown arrow*/}
        <ArrowDown2 size={16} variant="Outline" color="#8A9191" />
      </div>
      {/* Render calendar dropdown */}
      {showCalendar && (
        <Calendar
          date={date}
          calendarRef={calendarRef}
          className="fixed w-full sm:w-auto bottom-0 z-40 sm:z-[160] sm:bottom-auto left-0 sm:fixed sm:-translate-y-1/2"
          style={coords ? { top: coords.top, left: coords.left } : {}}
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
