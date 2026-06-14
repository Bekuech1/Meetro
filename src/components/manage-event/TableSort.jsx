import TagButton from "../layout-components/Buttons/TagButton";
import React, { useEffect, useRef, useState } from "react";
import { ArrowDown2 } from "iconsax-reactjs";
import { twMerge } from "tailwind-merge";

function TableSort({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get label for active sort option
  const activeLabel =
    options.find(option => option.value === value)?.label ?? options[0].label;

  const handleSelect = selectedValue => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <TagButton
        text={activeLabel}
        rightImg={<ArrowDown2 />}
        onClick={() => setIsOpen(prev => !prev)}
        className="satoshi font-bold min-w-0"
        variant="light-purple"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      />
      {/* Sort dropdown */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute overflow-hidden flex flex-col gap-px mt-1 satoshi font-medium right-0 w-full min-w-[160px] rounded-[12px] border border-white bg-white shadow-lg z-30"
        >
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => handleSelect(option.value)}
              className={twMerge(
                "w-full text-left px-3 py-2 text-xs satoshi hover:bg-[#f0f0f0]/90",
                value === option.value && "bg-[#f0f0f0]/90"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableSort;
