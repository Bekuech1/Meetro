import IconButton from "../Buttons/IconButton";
import TextButton from "../Buttons/TextButtons";
import EventsIcon from "@/assets/icons/EventsIcon";
import DiscoverIcon from "@/assets/icons/DiscoverIcon";
import { NavLink } from "react-router";
import { BsPlus } from "react-icons/bs";

export default function BottomNav() {
  return (
    <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
      <div className="bg-black p-1 rounded-full flex items-center md:gap-x-16">
        {/* Navigation Links */}
        <ul className="paytone flex items-center">
          <li>
            <NavLink
              to="/discover"
              className={({
                isActive,
              }) => `px-4 py-[14px] inline-flex gap-x-[6px] items-center transition-colors
            ${isActive ? "text-[#AEFC40]" : "text-[#55695E] hover:text-[#FFF]"}
            `}
            >
              <DiscoverIcon />
              <span className="text-[16px] leading-[11px]">Discover</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({
                isActive,
              }) => `inline-flex px-4 py-[14px] gap-x-[6px] items-center transition-colors
            ${isActive ? "text-[#AEFC40]" : "text-[#55695E] hover:text-[#FFF]"}
            `}
            >
              <EventsIcon />
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
      <IconButton icon={<BsPlus />} variant="secondary" className="md:hidden" />
    </div>
  );
}
