import { formatNaira, timeAgo } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Location, Money3, TickCircle } from "iconsax-reactjs";
import { FaCircle } from "react-icons/fa6";
import TagButton from "../layout-components/Buttons/TagButton";
import AvatarGroup from "../layout-components/AvatarGroup";

// Event status
const statusColors = {
  upcoming: "light-cyan",
  ongoing: "green",
  completed: "purple",
};

// Event response colors
const responseColors = {
  maybe: "purple",
  going: "green",
};

function EventItem({ event }) {
  console.log("Event data in EventItem:", event);
  const eventDate = new Date(event.startDate);
  const startTime = formatDate(eventDate, "hh:mm a");
  const hoursAgo = timeAgo(event.createdAt);

  const chipInDetails = event?.chipInDetails;

  // Chip in type
  const chipInType = chipInDetails?.chipInType;

  // Chip in amount
  const chipInAmount =
    chipInType === "fixed"
      ? chipInDetails?.fixedAmount
      : chipInType === "target"
        ? chipInDetails?.targetAmount
        : chipInType === "donation"
          ? chipInDetails?.minAmount
          : null;

  // Event location
  const eventLocation = event?.location?.state || event?.location?.city;

  // Guest avatars
  const guestAvatars =
    event?.guests?.slice(0, 2).map(guest => guest.photo) || [];

  return (
    <div className="border flex flex-col gap-6 border-white p-2 min-[500px]:p-3 bg-gradient-to-r from-[#FCFEF9]/50 to-white backdrop-blur-2xl rounded-2xl  cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,16,16,0.08)] hover:scale-[1.01]">
      <div className="flex gap-2">
        {/* Event image */}
        <div className="w-16 h-14.5 min-[500px]:w-[114px] min-[500px]:h-[106px] overflow-hidden rounded-[6px] min-[500px]:rounded-xl">
          <img
            src={event.image}
            alt={event.title}
            className="block size-full object-cover"
          />
        </div>
        {/* Event details */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Top */}
          <div>
            {/* Time details */}
            <div className="flex items-center justify-between gap-3 satoshi">
              <span className="text-xs text-[#8A9191] font-medium">
                {startTime}
              </span>
              <span className="text-xs text-[#8A9191] font-medium">
                {hoursAgo}
              </span>
            </div>
            {/* Title */}
            <div className="flex items-center gap-1 flex-wrap">
              <h3 className="text-base satoshi font-medium overflow-hidden overflow-ellipsis whitespace-nowrap capitalize text-[#001010]">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-1">
                {/* Event status */}
                <TagButton
                  text={event.status}
                  size="xs"
                  variant={statusColors[event.status]}
                  className="satoshi pointer-events-none pr-1.5"
                  leftImg={<FaCircle size={4} />}
                />
                {/* Manage access */}
                {event.userRole === "host" && (
                  <TagButton
                    size="xs"
                    text="Manage Access"
                    variant="light-cyan"
                    className="satoshi pointer-events-none bg-white pr-1.5"
                    leftImg={<FaCircle size={4} />}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Bottom - Desktop */}
          <div className="hidden flex-wrap items-center gap-1 min-[500px]:flex">
            {/* Location */}
            {eventLocation && (
              <TagButton
                size="sm"
                text={eventLocation}
                variant="light-purple"
                className="satoshi min-w-0 pointer-events-none px-1"
                leftImg={<Location size="12" variant="Bold" />}
              />
            )}
            {/* Chip in type */}
            {chipInDetails && chipInAmount && (
              <TagButton
                size="sm"
                text={`${chipInType === "fixed" ? "Fixed" : chipInType === "target" ? "Target" : "From"} - ${formatNaira(chipInAmount)}`}
                variant="light-purple"
                className="satoshi min-w-0 px-1 pointer-events-none"
                leftImg={<Money3 size={12} variant="Bold" />}
              />
            )}
            {/* Guest count */}
            {event?.guests && (
              <AvatarGroup
                size="xs"
                src={guestAvatars}
                count={event?.guests.length - guestAvatars.length}
              />
            )}
            {/* User response */}
            {event?.userResponse && (
              <TagButton
                size="sm"
                text={event.userResponse}
                variant={responseColors[event.userResponse]}
                className="satoshi min-w-0 pl-1 pointer-events-none pr-1.5"
                leftImg={<TickCircle size={12} variant="Bold" />}
              />
            )}
          </div>
        </div>
      </div>
      {/* Bottom - Mobile */}
      <div className="flex-wrap items-center gap-1 flex min-[500px]:hidden">
        {/* Location */}
        {eventLocation && (
          <TagButton
            size="sm"
            text={eventLocation}
            variant="light-purple"
            className="satoshi min-w-0 pointer-events-none px-1"
            leftImg={<Location size="12" variant="Bold" />}
          />
        )}
        {/* Chip in type */}
        {chipInDetails && chipInAmount && (
          <TagButton
            size="sm"
            text={`${chipInType === "fixed" ? "Fixed" : chipInType === "target" ? "Target" : "From"} - ${formatNaira(chipInAmount)}`}
            variant="light-purple"
            className="satoshi min-w-0 px-1 pointer-events-none"
            leftImg={<Money3 size={12} variant="Bold" />}
          />
        )}
        {/* Guest count */}
        {event?.guests && (
          <AvatarGroup
            size="xs"
            src={guestAvatars}
            count={event?.guests.length - guestAvatars.length}
          />
        )}
        {/* User response */}
        {event?.userResponse && (
          <TagButton
            size="sm"
            text={event.userResponse}
            variant={responseColors[event.userResponse]}
            className="satoshi min-w-0 pl-1 pointer-events-none pr-1.5"
            leftImg={<TickCircle size={12} variant="Bold" />}
          />
        )}
      </div>
    </div>
  );
}

export default EventItem;
