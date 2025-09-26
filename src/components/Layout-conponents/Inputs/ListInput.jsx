// ListInput component
// --------------------

import IconButton from "../Buttons/IconButton";
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
      className="input cursor-pointer hover:shadow-[0px_4px_24px_rgba(0,0,0,0.04)] transition-all rounded-[12px] border border-white bg-[#F8F8F7] satoshi py-3 px-2 flex items-center gap-x-2"
      {...props}
    >
      {/* Left icon */}
      {leftIcon && <IconButton variant="tertiary" icon={leftIcon} />}
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
                leftImg={tag.leftIcon}
                rightImg={tag.rightIcon}
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
        <>
          {typeof rightIcon === "string" ? (
            <img src={rightIcon} alt="right-icon" className="size-4" />
          ) : (
            <span className="[&>svg]:size-4 [&>svg]:fill-[#8A9191]">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </div>
  );
}
