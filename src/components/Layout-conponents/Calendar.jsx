import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { getMonth, getYear } from "date-fns";
import { ArrowDown2, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import Dropdown from "@/components/Layout-conponents/Inputs/Dropdown";
import TextButton from "@/components/Layout-conponents/Buttons/TextButtons";
import IconButton from "@/components/Layout-conponents/Buttons/IconButton";
import "react-day-picker/style.css";

// Month and year options
const MONTHS = [
  { id: 0, name: "January" },
  { id: 1, name: "February" },
  { id: 2, name: "March" },
  { id: 3, name: "April" },
  { id: 4, name: "May" },
  { id: 5, name: "June" },
  { id: 6, name: "July" },
  { id: 7, name: "August" },
  { id: 8, name: "September" },
  { id: 9, name: "October" },
  { id: 10, name: "November" },
  { id: 11, name: "December" },
];

const currentYear = getYear(new Date());
const years = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  name: currentYear + i,
}));

export default function Calendar({
  date,
  onSelect,
  className,
  close,
  ...rest
}) {
  const initialDate = date || new Date();
  const [month, setMonth] = useState(getMonth(initialDate));
  const [year, setYear] = useState(getYear(initialDate));
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const monthBtnRef = useRef(null);
  const yearBtnRef = useRef(null);

  // Previous month
  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  // Next month
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  return (
    <div
      className={`animate-in slide-in-from-bottom-20 pt-4 pb-3 px-5 md:pt-6 md:pb-5 border-[#f0f0f0] shadow-[0px_4px_24px_rgba(0,14,51,0.08)] rounded-[16px] bg-[#f9f9f9] ${className}`}
      {...rest}
    >
      <div className="flex justify-center items-center gap-[9px] md:gap-[35.5px] px-1">
        {/* Prev month button */}
        <IconButton
          icon={<ArrowLeft2 variant="Outline" size={24} color="#011F0F" />}
          onClick={previousMonth}
          variant="tertiary"
          className="!size-11"
          type="button"
        />
        <div className="flex items-center gap-1">
          {/* Month button */}
          <div className="relative">
            <TextButton
              variant="tertiary"
              text={MONTHS[month].name}
              className="!h-11 justify-center ignore-button min-w-[131px] !px-0"
              rightImg={<ArrowDown2 size={16} variant="Outline" />}
              type="button"
              ref={monthBtnRef}
              onClick={() => setMonthOpen(s => !s)}
            />
            {/* Render month dropdown */}
            {monthOpen && (
              <Dropdown
                className="mt-[10px] min-w-[140px]"
                active={MONTHS[month]}
                onSelect={val => {
                  setMonth(val.id);
                  setMonthOpen(false);
                }}
                modal
                buttonRef={monthBtnRef}
                onClose={() => setMonthOpen(false)}
                items={MONTHS}
              />
            )}
          </div>
          {/* Year button */}
          <div className="relative">
            <TextButton
              variant="tertiary"
              ref={yearBtnRef}
              text={year}
              className="!h-11 justify-center ignore-button !min-w-0 !w-[86px]"
              rightImg={<ArrowDown2 size={16} variant="Outline" />}
              onClick={() => setYearOpen(s => !s)}
            />
            {/* Render year dropdown */}
            {yearOpen && (
              <Dropdown
                className="mt-[10px] min-w-[140px]"
                active={years.find(y => y.name === year)}
                onSelect={val => {
                  setYear(val.name);
                  setYearOpen(false);
                }}
                modal
                buttonRef={yearBtnRef}
                onClose={() => setYearOpen(false)}
                items={years}
              />
            )}
          </div>
        </div>
        {/* Next month */}
        <IconButton
          icon={<ArrowRight2 variant="Outline" size={24} color="#011F0F" />}
          onClick={nextMonth}
          variant="tertiary"
          className="!size-11"
          type="button"
        />
      </div>
      {/* Calendar */}
      <DayPicker
        mode="single"
        selected={date}
        onSelect={onSelect}
        month={new Date(year, month)}
        hideWeekdays
        onMonthChange={d => {
          setMonth(getMonth(d));
          setYear(getYear(d));
        }}
        showOutsideDays
        hideNavigation
        /* Custom calendar styles */
        classNames={{
          month_grid:
            "w-full border-separate border-spacing-1 font-bold satoshi text-sm text-[#011F0F]",
          month: "pt-7 md:pt-2",
          day: "md:h-11 h-[38px] ",
          day_button:
            "cursor-pointer h-full text-[11px] md:text-[12px] md:leading-[18px] transition-all hover:bg-[#E5E7E3] duration-200 ease-in-out leading-[16px] text-[#001010] bg-white w-full  rounded-[7px] shadow-[0px_1px_1px_rgba(0,14,51,0.05)]",
          months: "w-full",
          selected:
            "[&>button]:!bg-[#AEFC40] [&>button]:!text-[#011F0F] [&>button]:hover:bg-[#AEFC40]",
          month_caption: "hidden",
          outside:
            "[&>button]:bg-transparent [&>button]:shadow-none pointer-events-none [&>button]:text-[#00175426]",
        }}
      />
      <div className="sm:hidden pt-11 flex justify-center">
        <TextButton onClick={close} text="Done" />
      </div>
    </div>
  );
}
