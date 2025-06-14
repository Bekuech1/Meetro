import React, { useState, useEffect } from "react";

const DressCodeSelector = ({ value, onChange }) => {
  // Initialize customEnabled based on whether initial value matches any preset
  const [customEnabled, setCustomEnabled] = useState(false);
  const [customValue, setCustomValue] = useState("");

  // Preset dress code options
  const presetOptions = [
    { id: "casual", label: "Casual" },
    { id: "corporate", label: "Corporate" },
    { id: "traditional", label: "Traditional" },
  ];

  // Set initial state based on provided value
  useEffect(() => {
    const isPresetValue = presetOptions.some(option => option.id === value);
    setCustomEnabled(!isPresetValue);
    if (!isPresetValue && value) {
      setCustomValue(value);
    }
  }, []);

  const handleOptionChange = (optionValue) => {
    const isCustom = optionValue === "custom";
    setCustomEnabled(isCustom);
    onChange(isCustom ? customValue : optionValue);
  };

  const handleCustomInput = (e) => {
    const newCustomValue = e.target.value;
    setCustomValue(newCustomValue);
    if (customEnabled) {
      onChange(newCustomValue);
    }
  };

  // Highlight effect for selected options
  const getOptionClass = (optionId) => {
    const baseClass = "flex items-center p-3 rounded-lg border bg-white/50 transition-all duration-200 satoshi cursor-pointer";
    const isSelected = optionId === "custom" ? customEnabled : value === optionId;
    return `${baseClass} ${isSelected ? "" : "border-white hover:scale-105"}`;
  };

  return (
    <div className="grid w-full gap-4">
      {/* Preset Options */}
      <div className="grid gap-2">
        {presetOptions.map((option) => (
          <label
            key={option.id}
            className={getOptionClass(option.id)}
          >
            <div className="flex items-center justify-center mr-3">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  value === option.id ? "border-[#AEFC40]" : "border-gray-300"
                }`}
              >
                {value === option.id && (
                  <div className="w-2 h-2 rounded-full bg-[#AEFC40]"></div>
                )}
              </div>
            </div>
            <div className="grid">
              <span className="text-[#8A9191] font-medium text-sm">
                {option.label}
              </span>
            </div>
            <input
              type="radio"
              name="dressCode"
              value={option.id}
              checked={value === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="opacity-0 absolute"
            />
          </label>
        ))}

        {/* Custom Option */}
        <label
          className={getOptionClass("custom")}
        >
          <div className="flex items-center justify-center mr-3">
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                customEnabled ? "border-[#AEFC40]" : "border-gray-300"
              }`}
            >
              {customEnabled && (
                <div className="w-2 h-2 rounded-full bg-[#AEFC40]"></div>
              )}
            </div>
          </div>
          <div className="flex items-center w-full satoshi">
            <input
              type="text"
              value={customValue}
              onChange={handleCustomInput}
              onFocus={() => !customEnabled && handleOptionChange("custom")}
              placeholder="Custom (if you have a specific dress code in mind)"
              className="w-full bg-transparent rounded-lg font-medium text-sm placeholder:text-[#8A9191] text-[#8A9191] focus:outline-none"
            />
          </div>
          <input
            type="radio"
            name="dressCode"
            value="custom"
            checked={customEnabled}
            onChange={() => handleOptionChange("custom")}
            className="opacity-0 absolute"
          />
        </label>
      </div>
    </div>
  );
};

export default DressCodeSelector;