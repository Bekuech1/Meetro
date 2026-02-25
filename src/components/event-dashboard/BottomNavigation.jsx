import { Add, Discover, TicketStar } from "iconsax-reactjs";
import { Link, NavLink } from "react-router";
import IconButton from "../layout-components/Buttons/IconButton";
import TextButton from "../layout-components/Buttons/TextButtons";

export default function BottomNav() {
  return (
    <div className="flex gap-x-4 gap-y-2 items-center justify-center flex-wrap fixed bottom-4 min-[680px]:bottom-21 z-30 mx-auto left-0 right-0 w-fit px-4">
      <div className="bg-[#01160B] p-1 rounded-full flex items-center min-[500px]:gap-x-16">
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
              to="/home"
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
        <Link to="/create-event">
          <TextButton
            text="Create Event"
            variant="secondary"
            className="min-h-11 hidden min-[500px]:inline-flex"
          />
        </Link>
      </div>
      {/* Mobile Create Event Button */}
      <IconButton
        icon={<Add size={24} color="#011F0F" variant="Outline" />}
        variant="secondary"
        className="min-[500px]:hidden"
      />
    </div>
  );
}
