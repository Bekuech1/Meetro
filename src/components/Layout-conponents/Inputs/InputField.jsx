// Reusable input field component
export default function InputField({
  leftIcon,
  rightIcon,
  placeholder = "Subtitle",
  ...rest
}) {
  return (
    <div className="flex satoshi gap-x-2 border input items-center hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] bg-[#f2f3f0] transition-all border-white rounded-[12px] px-[6px] py-[10px] md:py-[8px] max-h-11 md:max-h-9 backdrop-blur-xs">
      {/* Left icon */}
      {leftIcon && <span className="[&>svg]:size-6">{leftIcon}</span>}
      {/* Input element */}
      <input
        type="text"
        className="flex-1 placeholder:font-medium md:text-sm font-medium placeholder:text-[#B0B5B5] [&~svg]:fill-[#8A9191] outline-0"
        placeholder={placeholder}
        {...rest}
      />
      {/* Right icon */}
      {rightIcon && rightIcon}
    </div>
  );
}
