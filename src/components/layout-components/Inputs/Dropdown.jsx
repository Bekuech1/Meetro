import { useEffect, useRef } from "react";

export default function Dropdown({
  placeholder = "Select",
  items,
  className = "",
  onSelect,
  active,
  onClose,
  buttonRef,
  closeOnOutsideClick = true,
  modal = false,
}) {
  /* Dropdown ref */
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      const dropdownEl = dropdownRef.current;
      const buttonEl = buttonRef?.current;
      // Ignore if clicking inside dropdown or button (including children)
      if (
        dropdownEl?.contains(event.target) ||
        buttonEl?.contains(event.target)
      ) {
        return;
      }
      // Close dropdown
      onClose?.();
    }
    if (closeOnOutsideClick)
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`satoshi animate-in slide-in-from-bottom-20 ${modal ? "max-sm:rounded-t-[24px] max-sm:rounded-b-none max-sm:fixed max-sm:top-auto max-sm:bottom-0" : ""} left-0 top-full absolute rounded-[8px] z-20 text-left w-full overflow-hidden ${className} shadow-[0px_10px_22px_rgba(45,77,108,0.15)] bg-white`}
    >
      <div
        className={`overflow-y-auto ${modal ? "max-sm:max-h-[435px] max-sm:p-0" : ""} p-1 pt-0 max-h-[188px]`}
      >
        {/* Placeholder */}
        <div
          className={`text-sm ${modal ? "max-sm:shadow-[inset_0_4px_24px_rgba(2,142,75,0.08)] max-sm:mb-[2px] max-sm:px-4 max-sm:py-3" : ""} sticky text-[#8A9191] mb-0 bg-white pt-3 p-2 font-bold top-0`}
        >
          {placeholder}
        </div>
        <div className={`${modal ? "max-sm:p-1" : ""}`}>
          {/* Render options */}
          {items.length > 0 ? (
            items.map(opt => (
              <div
                key={opt.id}
                onClick={() => onSelect(opt)}
                className={`flex ${modal ? "max-sm:max-h-12 max-sm:py-3" : ""} items-center gap-2 px-2 py-2 max-h-9 rounded-[8px] cursor-pointer hover:bg-[#E5E7E3] ${
                  active?.id === opt.id
                    ? "bg-[#DAFEA7] hover:!bg-[#DAFEA7]"
                    : ""
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
                <span
                  className={`${modal ? "max-sm:text-base max-sm:font-medium" : ""} text-sm flex-1 font-bold`}
                >
                  {opt.name}
                </span>
                {/* Right icon */}
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
