import React, { useState } from "react";
import PopUpInput from "./PopUpInput";

const Calender = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get the first day of the month and what day of the week it falls on
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create array with empty cells for days before the month starts
    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return; // Don't do anything for empty cells
    
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
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const formattedDate = value
    ? value.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  const daysInMonth = getDaysInMonth(currentMonth);

  // Helper function to get date styling
  const getDateStyling = (date) => {
    if (!date) return ""; // Empty cell
    
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
    if (!date) return false; // Empty cell
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
                  date ? getDateStyling(date) : ""
                } ${
                  isDateClickable(date) 
                    ? "hover:scale-125 cursor-pointer" 
                    : date ? "cursor-not-allowed" : ""
                }`}
              >
                {date ? date.getDate() : ""}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;