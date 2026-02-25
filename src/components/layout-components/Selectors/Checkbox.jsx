import { BiCheck } from "react-icons/bi";

export default function Checkbox({ label = "Text Description", ...rest }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer satoshi">
      {/* Hidden checkbox */}
      <input type="checkbox" className="peer hidden" {...rest} />
      {/* Custom circle */}
      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white bg-[#E5E7E3] peer-checked:bg-[#61B42D] peer-checked:border-[#61B42D] peer-checked:[&>svg]:opacity-100">
        {/* Important: no "hidden" before peer-checked:block */}
        <BiCheck className="w-5 h-5 text-[#AEFC40] opacity-0" />
      </span>
      {/* Label text */}
      <span className="text-[#001010] text-[12px] leading-[18px] font-medium">
        {label}
      </span>
    </label>
  );
}
