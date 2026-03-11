import SelectInput from "./SelectInput";
import InputIcon from "@/assets/icons/InputIcon";
import { format, isValid, parse } from "date-fns";
import { Timer1 } from "iconsax-reactjs";
import { useMemo } from "react";

const DISPLAY_TIME_FORMAT = "h:mm a";

function createTimeOptions(minuteStep) {
  const options = [];
  const validStep = Number.isFinite(minuteStep)
    ? Math.min(60, Math.max(1, Math.trunc(minuteStep)))
    : 15;

  let id = 1;
  for (
    let totalMinutes = 0;
    totalMinutes < 24 * 60;
    totalMinutes += validStep
  ) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const date = new Date(2000, 0, 1, hours, minutes);
    options.push({ id, name: format(date, DISPLAY_TIME_FORMAT) });
    id += 1;
  }

  return options;
}

function normalizeTimeValue(time) {
  if (!time) return "";

  if (time instanceof Date && isValid(time)) {
    return format(time, DISPLAY_TIME_FORMAT);
  }

  const raw = String(time).trim();
  if (!raw) return "";

  const dateLike = new Date(raw);
  if (!Number.isNaN(dateLike.getTime())) {
    return format(dateLike, DISPLAY_TIME_FORMAT);
  }

  const baseDate = new Date();
  const patterns = [
    "h:mm a",
    "h:mma",
    "ha",
    "h a",
    "H:mm",
    "HH:mm",
    "HH:mm:ss",
  ];

  for (const pattern of patterns) {
    const parsed = parse(raw.toUpperCase(), pattern, baseDate);
    if (isValid(parsed)) {
      return format(parsed, DISPLAY_TIME_FORMAT);
    }
  }

  return raw;
}

export default function SelectTime({
  time,
  setTime,
  placeholder = "Select Time",
  className = "",
  minuteStep = 15,
}) {
  const times = useMemo(() => createTimeOptions(minuteStep), [minuteStep]);
  const displayTime = useMemo(() => normalizeTimeValue(time), [time]);

  return (
    <SelectInput
      placeholder={placeholder}
      value={displayTime}
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
