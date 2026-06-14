import InputField from "./InputField";
import Dropdown from "./Dropdown";
import { useMemo, useState } from "react";

// Searchable select dropdown component
export default function SearchInput({
  options,
  searchField = "name",
  placeholder,
  iconField = "leftIcon",
  value,
  setValue,
}) {
  // Controls dropdown visibility
  const [open, setOpen] = useState(false);

  // Memoize filtering to avoid recomputation on every render
  const filtered = useMemo(() => {
    const query = value[searchField]?.toLowerCase() || "";
    return options.filter(opt =>
      opt[searchField]?.toLowerCase().includes(query)
    );
  }, [options, value, searchField]);

  // Handle option selection
  const handleSelect = opt => {
    setValue({ [searchField]: opt[searchField], icon: opt[iconField] });
    setOpen(false);
  };

  // Handle change
  const handleChange = e => {
    const query = e.target.value;
    setValue({
      [searchField]: query,
      icon: !query.trim() ? null : value.icon,
    });
    setOpen(query.trim().length > 0 && filtered.length > 0);
  };

  return (
    <div className="relative">
      {/* Search input */}
      <InputField
        placeholder={placeholder}
        value={value[searchField]}
        onChange={handleChange}
        leftIcon={value?.icon}
      />
      {/* Render dropdown */}
      {open && filtered.length > 0 && (
        <Dropdown
          className="mt-1"
          active={value}
          onSelect={handleSelect}
          items={filtered}
          closeOnOutsideClick={false}
          modal
        />
      )}
    </div>
  );
}
