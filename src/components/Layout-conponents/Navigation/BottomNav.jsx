import { Add, Discover, TicketStar } from "iconsax-reactjs";
import { NavLink } from "react-router";
import IconButton from "../Buttons/IconButton";
import TextButton from "../Buttons/TextButtons";

export default function BottomNav() {
  return (
    <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
      <div className="bg-[#01160B] p-1 rounded-full flex items-center md:gap-x-16">
        {/* Navigation Links */}
        <ul className="paytone flex items-center">
          <li>
            <NavLink
              to="/discover"
              className={({
                isActive,
              }) => `px-4 py-[14px] inline-flex gap-x-[6px] items-center transition-colors
            ${isActive ? "text-[#AEFC40] [&>svg]:fill-[#AEFC40]" : "text-[#55695E] [&>svg]:fill-[#55695E]"}
            `}
            >
              <Discover variant="Bold" size={16} />
              <span className="text-[16px] leading-[11px]">Discover</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({
                isActive,
              }) => `inline-flex px-4 py-[14px] gap-x-[6px] items-center transition-colors
            ${isActive ? "text-[#AEFC40] [&>svg]:fill-[#AEFC40]" : "text-[#55695E] [&>svg]:fill-[#55695E]"}
            `}
            >
              <TicketStar variant="Bold" size={16} />
              <span className="text-[16px] leading-[11px]">My Events</span>
            </NavLink>
          </li>
        </ul>
        {/* Create Event Button */}
        <TextButton
          text="Create Event"
          variant="secondary"
          className="min-h-11 hidden md:inline-flex"
        />
      </div>
      {/* Mobile Create Event Button */}
      <IconButton
        icon={<Add size={24} color="#011F0F" variant="Outline" />}
        variant="secondary"
        className="md:hidden"
      />
    </div>
  );
}
