import InputField from "./InputField";
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
  const img = selectedIcon ? selectedIcon : null;

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
          leftIcon={img}
        />
        {open && query && (
          <div className="mt-1 satoshi rounded-[8px] absolute left-0 w-full top-full border shadow-[0px_10px_22px_rgba(45,77,108,0.15)] bg-white">
            <div className="overflow-y-auto p-1 pt-0 max-h-[152px] ">
              <div className="text-sm sticky text-[#8A9191] bg-white pt-3 p-2 font-bold top-0">
                Select
              </div>
              {filtered.length > 0 ? (
                filtered.map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => handleSelect(opt)}
                    className={`flex items-center gap-2 p-2 max-h-9 rounded-[8px] cursor-pointer hover:bg-[#E6FEC4] ${
                      selected?.id === opt.id ? "bg-[#DAFEA7]" : ""
                    }`}
                  >
                    {opt.leftIcon && opt.leftIcon}
                    <span className="text-sm flex-1 font-bold">{opt.name}</span>
                    {opt.rightIcon && opt.rightIcon}
                  </div>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">No results</div>
              )}
            </div>
          </div>
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
