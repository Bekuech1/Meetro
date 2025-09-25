export default function Radio({ label = "Text Description", ...rest }) {
  return (
    <label className="group flex items-center gap-2 cursor-pointer satoshi">
      {/* Hidden native radio input */}
      <input type="radio" className="peer hidden" {...rest} />
      {/* Custom outer circle */}
      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white bg-[#E5E7E3] peer-checked:bg-[#61B42D] peer-checked:border-[#61B42D]">
        {/* Inner dot (only visible when checked) */}
        <span className="w-[10px] h-[10px] rounded-full bg-[#AEFC40] opacity-0 group-has-[input:checked]:opacity-100"></span>
      </span>
      {/* Label text */}
      <span className="text-[#001010] text-[12px] leading-[18px] font-medium">
        {label}
      </span>
    </label>
  );
}
