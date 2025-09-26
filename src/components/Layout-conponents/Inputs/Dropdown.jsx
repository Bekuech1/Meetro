export default function Dropdown({
  placeholder = "Select",
  items,
  className = "",
  onSelect,
  active,
}) {
  return (
    <div
      className={`mt-1 satoshi rounded-t-[24px] md:rounded-[8px] overflow-hidden ${className} w-full shadow-[0px_10px_22px_rgba(45,77,108,0.15)] bg-white`}
    >
      <div className="md:overflow-y-auto md:p-1 md:pt-0 md:max-h-[188px]">
        <div className="text-sm shadow-[inset_0_4px_24px_rgba(2,142,75,0.08)] md:shadow-none md:sticky text-[#8A9191] mb-[2px] md:mb-0 bg-white md:pt-3 px-4 py-3 md:p-2 font-bold md:top-0">
          {placeholder}
        </div>
        <div className="p-1 md:p-0">
          {items.length > 0 ? (
            items.map(opt => (
              <div
                key={opt.id}
                onClick={() => onSelect(opt)}
                className={`flex items-center gap-2 py-3 px-2 md:py-2 max-h-12 md:max-h-9 rounded-[8px] cursor-pointer hover:bg-[#E6FEC4] ${
                  active?.id === opt.id ? "bg-[#DAFEA7]" : ""
                }`}
              >
                {/* Left icon */}
                {opt.leftIcon && (
                  <>
                    {typeof opt.leftIcon === "string" ? (
                      <img
                        src={opt.leftIcon}
                        alt="left-icon"
                        className="size-4"
                      />
                    ) : (
                      <span className="[&>svg]:size-4">{opt.leftIcon}</span>
                    )}
                  </>
                )}
                <span className="text-base md:text-sm flex-1 font-medium md:font-bold">
                  {opt.name}
                </span>
                {opt.rightIcon && (
                  <>
                    {typeof opt.rightIcon === "string" ? (
                      <img
                        src={opt.rightIcon}
                        alt="right-icon"
                        className="size-4"
                      />
                    ) : (
                      <span className="[&>svg]:size-4">{opt.rightIcon}</span>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">No results</div>
          )}
        </div>
      </div>
    </div>
  );
}
