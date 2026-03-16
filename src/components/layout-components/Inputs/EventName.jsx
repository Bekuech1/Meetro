// Available fonts for the user to choose from
const fonts = [
  { id: "paytone", label: "Paytone" },
  { id: "satoshi", label: "Satoshi" },
  { id: "nico-moji", label: "Nico Moji" },
  { id: "times-new-roman", label: "TN Roman" },
];

// EventName component: an input field for event names with selectable font options
export default function EventName({
  placeholder = "Event Name",
  font,
  value,
  onChange,
  onSelect,
  error,
}) {
  const handleChange = e => {
    onChange?.(e.target.value);
  };

  // Base button styles for font selection
  const baseBtn =
    "text-sm border py-[10px] px-4 rounded-full bg-white cursor-pointer transition-all";
  const selectedBtn = "border-[#866AD2] text-[#866AD2]";
  const defaultBtn =
    "text-[#8A9191] border-[#E5E7E3] hover:border-[#866AD2]/40 hover:text-[#866AD2]/70";

  return (
    // Wrapper container
    <div
      className={`hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] min-h-35 ${error ? "border-[#DB2863]" : "focus-within:border-[#7CB32D] border-white"} border bg-[#f7f7f6] transition-all rounded-[12px] backdrop-blur-[40px] p-3 flex flex-col gap-y-4`}
    >
      {/* Input field for event name */}
      <input
        type="text"
        aria-label="Event name"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${font} outline-0 text-2xl leading-[32px] placeholder:text-[#8A9191]`}
      />
      {/* Font Selector */}
      <div>
        <p className="text-sm font-medium satoshi mb-1 text-[#8A9191]">
          Choose a Font
        </p>
        {/* Font buttons */}
        <div className="flex flex-wrap gap-2">
          {fonts.map(f => (
            <button
              key={f.id}
              onClick={() => onSelect?.(f.id)}
              className={`${baseBtn} ${font === f.id ? selectedBtn : defaultBtn} ${f.id}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
