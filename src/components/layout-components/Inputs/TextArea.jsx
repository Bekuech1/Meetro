import { twMerge } from "tailwind-merge";

// Textarea component
export default function TextArea({
  placeholder = "Enter your Description Here",
  className,
  ...rest
}) {
  return (
    <textarea
      placeholder={placeholder}
      className={twMerge(
        "w-full satoshi min-h-[200px] placeholder:font-medium text-base text-[#001010] font-medium placeholder:text-[#8A9191] border hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] backdrop-blur-xs bg-[#f8f8f7] transition-all border-white rounded-[12px] p-3 resize-none focus:border-[#61B42D] outline-0",
        className && className
      )}
      {...rest}
    />
  );
}
