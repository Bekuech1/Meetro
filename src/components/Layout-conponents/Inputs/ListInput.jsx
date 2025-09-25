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
      {leftIcon && <span className="[&>svg]:size-9">{leftIcon}</span>}
      <div className="flex flex-1 flex-col gap-y-1">
        {title && (
          <h3 className="text-sm font-medium text-[#001010]">{title}</h3>
        )}
        {content ? (
          <p
            className={`${title ? "text-[#8A9191] text-[12px] leading-[18px]" : "text-sm text-[#001010]"} font-medium`}
          >
            {content}
          </p>
        ) : tags ? (
          <ul className="flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <button
                className="flex gap-x-1 p-[6px] bg-white rounded-full border border-[#E5E7E3] [&>svg]:size-4"
                key={i}
              >
                {tag.leftIcon && tag.leftIcon}
                <span className="font-medium text-[12px] leading-[18px]">
                  {tag.text}
                </span>
                {tag.rightIcon && tag.rightIcon}
              </button>
            ))}
          </ul>
        ) : (
          <p
            className={`${title ? "text-[12px] leading-[18px]" : "text-sm"} font-medium text-[#8A9191]`}
          >
            {placeholder}
          </p>
        )}
      </div>
      {rightIcon && (
        <span className="[&>svg]:size-4 [&>svg]:fill-[#8A9191]">
          {rightIcon}
        </span>
      )}
    </div>
  );
}
