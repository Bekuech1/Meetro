import React, { useState } from "react";
import PopUpInput from "./PopUpInput"; // Import the PopUpInput component

const TimeInput = ({ value, onTimeSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate times in 15-minute intervals
  const generateTimes = () => {
    const times = [];
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < 96; i++) {
      times.push(
        new Date(start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      start.setMinutes(start.getMinutes() + 15);
    }
    return times;
  };

  const times = generateTimes();

  const handleTimeClick = (time) => {
    onTimeSelect(time);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Input Field */}

      <PopUpInput
        value={value}
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        leftIcon="timer.svg" // Use a custom left icon
        rightIcon="arrow-down-gray.svg" // Use a custom right icon
        showLeftIcon={true} // Show or hide the left icon
        showRightIcon={true} // Show or hide the right icon
        rounded="rounded-r-[12px]" // Fully rounded corners
        placeholder="Time" // Custom placeholder text
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 bg-white shadow-2xl rounded-[12px] z-10 w-full h-fit flex justify-center satoshi">
          {/* Scrollable Time List */}
          <div className="p-2 h-fit w-full flex justify-center">
            <div className="h-[120px] w-full overflow-y-auto scrollbar-hide scroll-smooth">
              {times.map((time, index) => (
                <div
                  key={index}
                  className={`p-2  cursor-pointer rounded-md flex justify-center hover:scale-110 transition ${
                    value === time ? "text-black font-[600]" : "text-[#8A9191] font-medium"
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeInput;
