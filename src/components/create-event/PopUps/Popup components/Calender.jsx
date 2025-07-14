import React, { useState } from "react";
import PopUpInput from "./PopUpInput";

const Calender = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Array(31)
      .fill(null)
      .map((_, i) => new Date(year, month, i + 1))
      .filter((d) => d.getMonth() === month);
  };

  const handleDateClick = (date) => {
    // Only allow selection of current day or future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today) {
      onChange(date);
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const formattedDate = value
    ? value.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Pick a date";

  const daysInMonth = getDaysInMonth(currentMonth);

  // Helper function to get date styling
  const getDateStyling = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    const isSelected = value && value.toDateString() === date.toDateString();
    const isPast = compareDate < today;
    const isToday = compareDate.getTime() === today.getTime();
    const isFuture = compareDate > today;

    if (isSelected) {
      return "text-white bg-[#011F0F] font-[600]";
    } else if (isPast) {
      return "text-[#8A9191] font-medium cursor-not-allowed";
    } else if (isToday || isFuture) {
      return "text-black font-medium hover:bg-gray-100";
    }
    
    return "text-[#8A9191] font-medium";
  };

  // Helper function to determine if date is clickable
  const isDateClickable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <div className="relative w-full h-fit">
      {/* Input Field */}
      <PopUpInput
        value={formattedDate}
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        leftIcon="/calendar.svg"
        rightIcon="/arrow-down-gray.svg"
        showLeftIcon={true}
        showRightIcon={true}
        rounded="rounded-l-[12px]"
        placeholder="Pick a date"
        label={label}
      />

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white shadow-2xl rounded-[12px] p-2 z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 active:scale-75 transition-transform duration-300"
            >
              <img
                src="/arrow-down-gray.svg"
                className="w-5 h-4 rotate-90 hover:scale-150 transition-transform duration-200"
                alt="Previous month"
              />
            </button>
            <span className="text-black text-[12px] font-[400] paytone">
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-2 active:scale-75 transition-transform duration-300"
            >
              <img
                src="/arrow-down-gray.svg"
                className="w-5 h-4 rotate-270 hover:scale-150 transition-transform duration-200"
                alt="Next month"
              />
            </button>
          </div>

          {/* Days of the Week */}
          <div className="grid grid-cols-7 gap-[6px] text-center text-sm">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-black text-[12px] font-[700] satoshi"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days in Month */}
          <div className="grid grid-cols-7 gap-[6px] mt-1">
            {daysInMonth.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={!isDateClickable(date)}
                className={`p-2 rounded-lg satoshi text-[10px] flex justify-center transition-all duration-200 ${
                  getDateStyling(date)
                } ${
                  isDateClickable(date) 
                    ? "hover:scale-125 cursor-pointer" 
                    : "cursor-not-allowed"
                }`}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;