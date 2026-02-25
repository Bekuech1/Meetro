import { twMerge } from "tailwind-merge";

export default function EventDate({ date, className = "" }) {
  const [dayName, rest] = date.split(",");
  return (
    <div
      className={twMerge(
        `inline-flex items-center mb-4 satoshi text-xs  text-[#001010] font-bold rounded-full bg-white p-1.5`,
        className && className
      )}
    >
      <span className="text-[#8A9191] mr-1">{dayName}, </span>
      <span> {rest}</span>
    </div>
  );
}
