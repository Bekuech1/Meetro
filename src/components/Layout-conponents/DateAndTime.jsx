import React from "react";
import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
import "react-day-picker/dist/style.css";

const DateTimePicker = ({
  mode = "single",
  selected,
  onSelect,
  showTime = false,
  className = "",
  minDate,
  maxDate,
}) => {
  const handleTimeChange = e => {
    const [hours, minutes] = e.target.value.split(":");
    const updated = new Date(selected);
    updated.setHours(Number(hours));
    updated.setMinutes(Number(minutes));
    onSelect(updated);
  };

  return (
    <div
      className={`rounded-lg p-4 bg-[#F9F9F9] border border-[#F0F0F0] shadow w-fit ${className}`}
    >
      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        fromDate={minDate}
        toDate={maxDate}
        navLayout="around"
        captionLayout="dropdown"
        // defaultMonth={new Date(2024, 6)}
        // startMonth={new Date(2024, 6)}
        // endMonth={new Date(2025, 9)}
        weekStartsOn={1}
        modifiersClassNames={{
          selected: "bg-[#AEFC40] rounded-[8px] m-0.5",
          range_start: "bg-[#AEFC40]",
          range_end: "bg-[#AEFC40] ",
          range_middle: "bg-[#E6FEC4]",
        }}
        classNames={{
          months: "flex justify-center",
          caption: "flex justify-center gap-2 mb-4",
          nav: "flex items-center justify-between bg-black",
          table: "w-full border-collapse",
          head_row: "flex gap-2",
          row: "flex gap-2 bg-white",
          cell: "w-10 h-15 m-1  flex items-center justify-center text-sm bg-gray-400 rounded",
          // day_selected: "bg-[#AEFC40] text-white",
          // day_today: "border border-green-600",
        }}
      />

      {showTime && mode === "single" && selected instanceof Date && (
        <div className="mt-4 flex items-center gap-2">
          <label className="text-sm text-gray-600">Time:</label>
          <input
            type="time"
            className="border rounded px-2 py-1 text-sm"
            onChange={handleTimeChange}
          />
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
