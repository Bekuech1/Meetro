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
    onChange(date); // Trigger the parent component's onChange handler
    setIsOpen(false);
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

  return (
    <div className="relative w-full h-fit">
      {/* Input Field */}

      <PopUpInput
        value={formattedDate}
        onIconClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        leftIcon="calendar.svg" // Use a custom left icon
        rightIcon="arrow-down-gray.svg" // Use a custom right icon
        showLeftIcon={true} // Show or hide the left icon
        showRightIcon={true} // Show or hide the right icon
        rounded="rounded-l-[12px]" // Fully rounded corners
        placeholder="Pick a date" // Custom placeholder text
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
                src="arrow-down-gray.svg"
                className="w-5 h-4 rotate-90 hover:scale-150 transition-transform duration-200"
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
                src="arrow-down-gray.svg"
                className="w-5 h-4 rotate-270 hover:scale-150 transition-transform duration-200"
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
                className={`p-2 rounded-lg satoshi text-[10px] flex justify-center hover:scale-125 ${
                  value?.toDateString() === date.toDateString()
                    ? "text-black font-[600]"
                    : "text-[#8A9191] font-medium"
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
