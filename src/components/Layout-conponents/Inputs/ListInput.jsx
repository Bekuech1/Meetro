// ListInput component
// --------------------

import { BiSolidInfoCircle } from "react-icons/bi";
import TagButton from "../Buttons/TagButton";

export default function ListInput({
  content = "",
  leftIcon,
  rightIcon,
  title,
  placeholder = "When is your event",
  tags,
  ...props
}) {
  return (
    <div
      className="input cursor-pointer rounded-[12px] border border-white bg-[#F8F8F7] satoshi py-3 px-2 flex items-center gap-x-2"
      {...props}
    >
      {/* Left icon */}
      {leftIcon && <span className="[&>svg]:size-9">{leftIcon}</span>}
      <div className="flex flex-1 flex-col gap-y-1">
        {title && (
          <h3 className="text-sm font-medium text-[#001010]">{title}</h3>
        )}
        {/* Priority: content → tags → placeholder */}
        {content ? (
          <p
            className={`${title ? "text-[#8A9191] text-[12px] leading-[18px]" : "text-sm text-[#001010]"} font-medium`}
          >
            {content}
          </p>
        ) : tags ? (
          // If no content, render tags
          <ul className="flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <TagButton
                variant="white"
                size="md"
                text={tag.text}
                key={i}
                leftImg={<BiSolidInfoCircle />}
                rightImg={<BiSolidInfoCircle />}
              />
            ))}
          </ul>
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
        <span className="[&>svg]:size-4 [&>svg]:fill-[#8A9191]">
          {rightIcon}
        </span>
      )}
    </div>
  );
}
