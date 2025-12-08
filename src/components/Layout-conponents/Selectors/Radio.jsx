// Sizes
const sizes = {
  md: {
    outer: "size-6",
    inner: "size-[10px]",
    gap: "gap-x-2",
  },
  sm: {
    outer: "size-4",
    inner: "size-[6.7px]",
    gap: "gap-x-1",
  },
};

export default function Radio({
  label = "Text Description",
  hideLabel = false,
  size = "md",
  ...rest
}) {
  return (
    <label
      className={`group flex text-[#001010] text-[12px] leading-[18px] font-medium items-center ${sizes[size].gap} cursor-pointer satoshi`}
    >
      {/* Hidden native radio input */}
      <input type="radio" className="peer hidden" {...rest} />
      {/* Custom outer circle */}
      <span
        className={`${sizes[size].outer} flex items-center justify-center rounded-full border border-white bg-[#E5E7E3] peer-checked:bg-[#61B42D] peer-checked:border-[#61B42D]`}
      >
        {/* Inner dot (only visible when checked) */}
        <span
          className={`${sizes[size].inner} rounded-full bg-[#AEFC40] opacity-0 group-has-[input:checked]:opacity-100`}
        ></span>
      </span>
      {/* Label text */}
      {!hideLabel && <span>{label}</span>}
    </label>
  );
}
