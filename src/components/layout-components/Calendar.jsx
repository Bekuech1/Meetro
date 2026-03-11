import { useMemo, useRef, useState } from "react";
import { getMonth, getYear, isSameDay } from "date-fns";
import { ArrowDown2, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import Dropdown from "@/components/layout-components/Inputs/Dropdown";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import IconButton from "@/components/layout-components/Buttons/IconButton";

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

// Get current year for generating year options in dropdown
const currentYear = getYear(new Date());

// Total cells in calendar grid
const CALENDAR_CELLS = 42;

// Utility to get number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Utility to parse and validate date input
function toValidDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  const parsed = value ? new Date(value) : null;
  if (parsed && !Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return null;
}

// Builds an array of 42 days to fill the calendar grid, including days from previous and next month
function buildCalendarDays(year, month) {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDaysThisMonth = getDaysInMonth(year, month);
  const previousMonth = month === 0 ? 11 : month - 1;
  const previousMonthYear = month === 0 ? year - 1 : year;
  const totalDaysPreviousMonth = getDaysInMonth(
    previousMonthYear,
    previousMonth
  );

  const days = [];

  for (let i = 0; i < firstDayIndex; i += 1) {
    const day = totalDaysPreviousMonth - firstDayIndex + i + 1;
    days.push({
      date: new Date(previousMonthYear, previousMonth, day),
      isOutside: true,
    });
  }

  for (let day = 1; day <= totalDaysThisMonth; day += 1) {
    days.push({ date: new Date(year, month, day), isOutside: false });
  }

  const remainingCells = CALENDAR_CELLS - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;

  for (let day = 1; day <= remainingCells; day += 1) {
    days.push({
      date: new Date(nextMonthYear, nextMonth, day),
      isOutside: true,
    });
  }

  return days;
}

// Main calendar component
export default function Calendar({
  date,
  onSelect,
  className,
  close,
  calendarRef,
  ...rest
}) {
  const initialDate = toValidDate(date) || new Date();
  const [month, setMonth] = useState(getMonth(initialDate));
  const [year, setYear] = useState(getYear(initialDate));
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const monthBtnRef = useRef(null);
  const yearBtnRef = useRef(null);
  const selectedDate = toValidDate(date);

  const years = useMemo(() => {
    const startYear = Math.min(currentYear, year) - 2;
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: startYear + i,
    }));
  }, [year]);

  const days = useMemo(() => buildCalendarDays(year, month), [year, month]);

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
      ref={calendarRef}
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
      <div className="w-full pt-7 md:pt-2">
        <div className="grid grid-cols-7 gap-1 w-full font-bold satoshi text-sm text-[#011F0F]">
          {days.map(day => {
            const isSelected =
              selectedDate &&
              !day.isOutside &&
              isSameDay(day.date, selectedDate);

            return (
              <div key={`${day.date.getTime()}-${day.isOutside ? "o" : "i"}`}>
                <button
                  type="button"
                  disabled={day.isOutside}
                  onClick={() => onSelect?.(day.date)}
                  className={`md:h-11 h-[38px] w-full rounded-[7px] text-[11px] md:text-[12px] md:leading-[18px] leading-[16px] transition-all duration-200 ease-in-out ${
                    day.isOutside
                      ? "bg-transparent shadow-none pointer-events-none text-[#00175426]"
                      : "cursor-pointer text-[#001010] bg-white shadow-[0px_1px_1px_rgba(0,14,51,0.05)] hover:bg-[#E5E7E3]"
                  } ${isSelected ? "!bg-[#AEFC40] !text-[#011F0F] hover:!bg-[#AEFC40]" : ""}`}
                  aria-label={day.date.toDateString()}
                >
                  {day.date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sm:hidden pt-11 flex justify-center">
        <TextButton onClick={close} text="Done" />
      </div>
    </div>
  );
}
