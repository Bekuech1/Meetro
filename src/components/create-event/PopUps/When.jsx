import React, { useState } from "react";
import InputModals from "../InputModals";
import Calender from "./Popup components/Calender"; // Custom Calendar Component
import TimeInput from "./Popup components/TimeInput"; // Custom Time Input Component
import PopUpInput from "./Popup components/PopUpInput";

const When = ({ isVisible, onClose, onSave }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [frequency, setFrequency] = useState(""); // Frequency for recurring events
  const [occuringDate, setOccuringDate] = useState(null);
  const [occuringTime, setOccuringTime] = useState("");

  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);
  const handleStartTimeSelect = (time) => setStartTime(time);
  const handleEndTimeSelect = (time) => setEndTime(time);
  const handleOccuringDateChange = (date) => setOccuringDate(date);
  const handleOccuringTimeSelect = (time) => setOccuringTime(time);

  const handleFrequencySelect = (freq) => {
    setFrequency(freq);
    setIsOpen(false); // Close dropdown after selecting frequency
  };

  const formatOccurringText = () => {
    if (!occuringDate || !frequency) return "Pick a frequency"; 

    const day = occuringDate.getDate();
    const month = occuringDate.toLocaleString("default", { month: "long" });
    const weekday = occuringDate.toLocaleString("default", { weekday: "long" });

    switch (frequency) {
      case "Daily":
        return `Everyday of this week`;
      case "Weekly":
        return `Weekly, every ${weekday}`;
      case "Monthly":
        return `Monthly, every ${day}th day`;
      case "Yearly":
        return `Yearly, every ${day} ${month}`;
      default:
        return "Pick a frequency";
    }
  };

  const handleSave = () => {
    if (onSave) {
      const formattedStartDate = startDate
        ? startDate.toISOString().split("T")[0]
        : null;
      const formattedEndDate = endDate
        ? endDate.toISOString().split("T")[0]
        : null;

      console.log("Save Result:", {
        formattedStartDate,
        startTime,
        formattedEndDate,
        endTime,
        frequency,
        occuringDate,
      });
    }
    onClose();
  };

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="When is your event?"
      onSave={handleSave}
      hidden3="hidden"
      text1="Single"
      text2="Reoccurring"
    >
      {[
        // Single Event
        <div className="grid gap-4" key="1">
          <div className="h-fit w-full flex gap-[2px] text-left items-end">
            <Calender
              value={startDate}
              onChange={handleStartDateChange}
              label="Start"
            />
            <TimeInput value={startTime} onTimeSelect={handleStartTimeSelect} />
          </div>
          <div className="h-fit w-full flex gap-[2px] text-left items-end">
            <Calender
              value={endDate}
              onChange={handleEndDateChange}
              label="End"
            />
            <TimeInput value={endTime} onTimeSelect={handleEndTimeSelect} />
          </div>
        </div>,

        // Recurring Event
        <div key="2" className="grid gap-4">
          <div className="h-fit w-full flex gap-[2px] text-left items-end">
            <Calender
              value={occuringDate}
              onChange={handleOccuringDateChange}
              label="Start"
            />
            <TimeInput
              value={occuringTime}
              onTimeSelect={handleOccuringTimeSelect}
            />
          </div>
          <div className="relative w-full h-fit">
            <PopUpInput
              value={formatOccurringText()} // Show formatted frequency text
              onIconClick={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              leftIcon="calendar.svg"
              rightIcon="arrow-down-gray.svg"
              showLeftIcon={true}
              showRightIcon={true}
              rounded="rounded-[12px]"
              placeholder="Pick a frequency"
              label="Frequency"
            />
            {isOpen && (
              <ul className="top-0 absolute bg-white border rounded-[12px] shadow-lg mt-16 w-[40%] z-10 text-left">
                {["Daily", "Weekly", "Monthly", "Yearly"].map((option) => (
                  <li
                    key={option}
                    className="flex items-center px-4 py-2 cursor-pointer hover:scale-105 transition-transform satoshi font-medium text-[14px] capitalize"
                    onClick={() => handleFrequencySelect(option)}
                  >
                    <div
                      className={`w-4 h-4 mr-3 flex items-center justify-center rounded-full border-2`}
                    >
                      {frequency === option && (
                        <div
                          className={`w-2 h-2 rounded-full border ${
                            frequency === option ? "bg-[#BEFD66]" : "bg-white"
                          }`}
                        ></div>
                      )}
                    </div>
                    <span className="hover:scale-105">{option}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>,
      ]}
    </InputModals>
  );
};

export default When;
