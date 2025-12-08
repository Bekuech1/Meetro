import { timeOptions } from "@/lib/utils";
import { Timer1 } from "iconsax-reactjs";
import SelectInput from "./SelectInput";
import InputIcon from "@/assets/icons/InputIcon";

export default function SelectTime({
  time,
  setTime,
  placeholder = "Select Time",
  className = "",
}) {
  const times = timeOptions();

  return (
    <SelectInput
      placeholder={placeholder}
      value={time}
      setValue={setTime}
      options={times}
      className={className}
      icon={
        <InputIcon>
          <Timer1 size={16} variant="Bold" />
        </InputIcon>
      }
    />
  );
}
