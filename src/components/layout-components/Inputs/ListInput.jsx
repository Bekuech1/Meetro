import IconButton from "../Buttons/IconButton";
import { CloseCircle } from "iconsax-reactjs";

export default function ListInput({
  content = "",
  leftIcon,
  rightIcon,
  title,
  error = "",
  placeholder = "When is your event",
  tags,
  ...props
}) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-y-1">
      <div
        className={`input cursor-pointer max-w-full hover:shadow-[0px_4px_24px_rgba(0,0,0,0.04)] transition-all rounded-[12px] border ${
          hasError ? "border-[#DB2863]" : "border-white"
        } bg-[#F8F8F7] satoshi py-3 px-2 flex flex-col gap-y-2`}
        {...props}
      >
        <div className="flex items-center gap-x-2 w-full">
          {/* Left icon */}
          {leftIcon && (
            <IconButton
              className="pointer-events-none"
              variant="tertiary"
              icon={leftIcon}
            />
          )}
          <div className="flex flex-1 flex-col gap-y-1">
            {title && (
              <h3 className="text-sm font-medium text-[#001010]">{title}</h3>
            )}
            {/* Priority: content → tags → placeholder */}
            {content ? (
              <p
                className={`${
                  title
                    ? "text-[#8A9191] text-[12px] leading-[18px]"
                    : "text-sm text-[#001010]"
                } font-medium`}
              >
                {content}
              </p>
            ) : tags ? (
              // If no content, render tags
              <ul className="flex flex-wrap gap-1">{tags}</ul>
            ) : (
              // Fallback: show placeholder text if nothing else
              <p
                className={`${title ? "text-[12px] leading-[18px]" : "text-sm"} font-medium text-[#8A9191]`}
              >
                {placeholder}
              </p>
            )}
          </div>
          {/* Right icon */}
          {rightIcon && (
            <div>
              {typeof rightIcon === "string" ? (
                <img src={rightIcon} alt="right-icon" className="size-4" />
              ) : (
                <span className="[&>svg]:size-4 [&>svg]:fill-[#8A9191]">
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {error ? (
        <div className="flex items-center gap-x-1 text-[#DB2863] text-xs font-medium">
          <CloseCircle size={16} variant="Bold" />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}
