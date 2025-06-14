import React, { useState } from "react";
import InputModals from "../InputModals";
import Calender from "./Popup components/Calender"; // Custom Calendar Component
import TimeInput from "./Popup components/TimeInput"; // Custom Time Input Component

const When = ({ isVisible, onClose, onSave }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);
  const handleStartTimeSelect = (time) => setStartTime(time);
  const handleEndTimeSelect = (time) => setEndTime(time);

  const handleSave = () => {
    // Format the dates for consistent data structure
    const formatDate = (date) => {
      if (!date) return null;

      const options = {
        weekday: "long", // Full name of the day (e.g., "Monday")
        day: "numeric", // Day of the month (e.g., "5")
        month: "long", // Full name of the month (e.g., "June")
        year: "numeric", // Full year (e.g., "2025")
      };

      return date.toLocaleDateString("en-US", options);
    };

    const formattedStartDate = startDate ? formatDate(startDate) : null;
    const formattedEndDate = endDate ? formatDate(endDate) : null;

    let TimeData;

    TimeData = {
      startDate: formattedStartDate,
      startTime,
      endDate: formattedEndDate,
      endTime,
    };

    // Pass the structured data to parent component via onSave
    if (onSave) {
      onSave(TimeData);
    }
    onClose();
  };

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="When is your event?"
      onSave={handleSave}
      hidden="hidden"
    >
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
      </div>
      <div></div>
    </InputModals>
  );
};

export default When;
