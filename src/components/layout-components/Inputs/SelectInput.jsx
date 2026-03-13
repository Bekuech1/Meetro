import Dropdown from "./Dropdown";
import { ArrowDown2 } from "iconsax-reactjs";
import { useRef, useState } from "react";

export default function SelectInput({
  value,
  setValue,
  options = [],
  placeholder = "Choose One",
  icon,
  className = "",
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const close = () => setShowDropdown(false);

  return (
    <div className="relative">
      {/* Button */}
      <div
        ref={inputRef}
        onClick={() => setShowDropdown(s => !s)}
        className={`flex cursor-pointer satoshi gap-x-2 border input items-center hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] bg-[#f8f8f7] transition-all border-white rounded-[12px] px-[6px] py-[10px] md:py-[8px] max-h-11 md:max-h-9 backdrop-blur-xs ${className}`}
      >
        {/* Icon */}
        {icon && (
          <div>
            {typeof icon === "string" ? (
              <img src={icon} alt="left-icon" className="size-6" />
            ) : (
              <span className="[&_svg]:size-4">{icon}</span>
            )}
          </div>
        )}
        {/* Placeholder */}
        <p
          className={`flex-1 md:text-sm font-medium ${value ? "text-[#001010]" : "text-[#B0B5B5]"} [&~svg]:fill-[#8A9191]`}
        >
          {value ? value : placeholder}
        </p>
        {/* Dropdown arrow*/}
        <ArrowDown2 size={16} variant="Outline" color="#8A9191" />
      </div>
      {/* Render options dropdown */}
      {showDropdown && options.length > 0 && (
        <Dropdown
          onSelect={option => {
            setValue(option.name);
            setShowDropdown(false);
          }}
          active={options.find(item => item.name === value)}
          modal
          buttonRef={inputRef}
          className="mt-1"
          items={options}
          onClose={close}
        />
      )}
    </div>
  );
}
