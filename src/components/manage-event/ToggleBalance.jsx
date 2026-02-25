import { formatNaira } from "@/lib/utils";
import { Eye, EyeSlash } from "iconsax-reactjs";
import { useState } from "react";

function ToggleBalance({ balance }) {
  const [showBalance, setShowBalance] = useState(true);
  return (
    <div className="flex items-center gap-4 satoshi py-[5px]">
      <div className="flex items-center gap-1">
        <span className="text-[#8A9191] text-xl leading-7.5 font-medium">
          ₦
        </span>
        <span className="text-[18px] leading-7 font-bold">
          {showBalance ? formatNaira(balance, 2).replace("₦", "") : "******"}
        </span>
      </div>
      <button
        className="bg-transparent inline-block cursor-pointer"
        onClick={() => setShowBalance(!showBalance)}
      >
        {showBalance ? <Eye size={22} /> : <EyeSlash size={22} />}
      </button>
    </div>
  );
}

export default ToggleBalance;
