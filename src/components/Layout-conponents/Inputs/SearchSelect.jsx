import InputField from "./InputField";
import Dropdown from "./Dropdown";
import { BiSolidTrash } from "react-icons/bi";
import { useState } from "react";

// Searchable select dropdown component
export default function SearchSelect({ options, placeholder, onSelect }) {
  // Local state for input value
  const [query, setQuery] = useState("");

  // Currently selected option object
  const [selected, setSelected] = useState(null);

  // Stores the left icon of the selected option
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Controls dropdown visibility
  const [open, setOpen] = useState(false);

  // Filter options based on user input (case-insensitive)
  const filtered = options.filter(opt =>
    opt.name.toLowerCase().includes(query.toLowerCase())
  );

  // Handle option selection
  const handleSelect = opt => {
    setSelected(opt);
    setQuery(opt.name);
    onSelect?.(opt.name);
    setSelectedIcon(opt.leftIcon);
    setOpen(false);
  };

  // Icon shown in the input field (if any)
  const icon = selectedIcon ? selectedIcon : null;

  return (
    <div>
      <div className="relative">
        <InputField
          placeholder={placeholder}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          leftIcon={icon}
        />
        {open && query && (
          <Dropdown
            className="top-full left-0 absolute"
            active={selected}
            onSelect={handleSelect}
            items={filtered}
          />
        )}
      </div>
      {/* Remove button - clears selection */}
      <button
        onClick={() => {
          setQuery("");
          setSelected(null);
          setSelectedIcon(null);
          onSelect?.(null);
        }}
        className="mt-1 cursor-pointer flex items-center gap-x-1 rounded-full p-1 bg-white text-[10px] leading-[14px] font-medium text-[#DB2863]"
      >
        Remove
        <BiSolidTrash size={12} />
      </button>
    </div>
  );
}
