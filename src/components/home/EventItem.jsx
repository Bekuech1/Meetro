import { useMemo } from "react";
import { useNavigate } from "react-router";
import { timeAgo } from "@/lib/utils";
import { getProfilePicture } from "../Profile/PersonalProfile";
import SiteBtn from "../Layout-conponents/SiteBtn";

const formatAttendeesDisplay = (attendees = []) => {
  // Filter attendees who responded "yes" and remove duplicates by userId
  const uniqueYes = Array.from(
    new Map(
      attendees
        .filter(a => a.response === "yes") // keep only those attending
        .map(a => [a.userId, a]) // create [key, value] pairs by userId
    ).values() // extract unique attendee objects
  );

  // no one said "yes", show a default message
  if (uniqueYes.length === 0) return "no one going yet";

  // Extract only first names
  const firstNames = uniqueYes.map(a => a.name.split(" ")[0]);

  // Take up to 2 names to display
  const displayNames = firstNames.slice(0, 2).join(", ");

  // Calculate how many extra attendees are left beyond the first 2
  const extraCount = firstNames.length - 2;

  // Format final output:
  //   - If there are more than 2 attendees → "John, Mary +3"
  //   - Otherwise → "John, Mary"
  return extraCount > 0 ? `${displayNames} +${extraCount}` : displayNames;
};

// Event item card
const EventItem = ({ event, openModal, type = "created" }) => {
  // Navigate hook
  const navigate = useNavigate();

  // Get profile image
  const profilePic = useMemo(() => getProfilePicture(), []);

  // Open event modal
  const handleClick = () => openModal(event.id);

  // Event image
  const imageUrl = event.imageUrl
    ? `${import.meta.env.VITE_IMAGE_URL}/${event.imageUrl.S ? event.imageUrl.S : event.imageUrl}`
    : "/event-ph1.png";

  // Event location
  const locationText = `${event?.location?.venue?.S || event?.location?.venue}, ${event?.location?.state?.S || event?.location?.state}`;

  // Event host
  const hostName =
    event.creator?.firstName && event.creator?.lastName
      ? `${event.creator.firstName} ${event.creator.lastName}`
      : event.hostName;

  return (
    <section
      className="bg-[#FCFEF9]/50 backdrop-blur-[40px] rounded-[16px] p-3 flex gap-[10px] border border-white cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,16,16,0.08)] hover:scale-[1.01]"
      onClick={handleClick}
    >
      <div className="shrink-0 w-[70px] h-[64px] md:w-[114px] md:h-[104px]">
        <img
          src={imageUrl}
          alt="event"
          className="w-full h-full object-cover rounded-[8px]"
          loading="lazy"
        />
      </div>

      <ul className="w-full grid sm:gap-[2px] gap-[2px] satoshi">
        <li className="flex justify-between">
          <h4 className="capitalize satoshi text-[#001010] text-base font-medium leading-tight">
            {event.title}
          </h4>
        </li>

        <li className="flex gap-1 items-center">
          <h6 className="text-[#8A9191] text-xs font-bold capitalize satoshi">
            host
          </h6>
          <img src={profilePic} className="w-4 h-4 rounded-full" alt="host" />
          <h6 className="text-black text-xs font-medium capitalize">
            {hostName}
          </h6>
        </li>

        <li className="flex gap-1 items-center">
          <img src="/event-timer.svg" className="w-4 h-4" alt="time" />
          <h6 className="text-[#8A9191] text-xs font-medium">
            {event.timeFrom}
          </h6>
        </li>

        <li className="flex gap-1 items-center">
          <img src="/event-location.svg" className="w-4 h-4" alt="location" />
          <h6 className="text-[#8A9191] text-xs font-medium capitalize">
            {locationText}
          </h6>
        </li>

        <li className="flex gap-1 items-center">
          <h6 className="text-[#8A9191] text-xs font-bold capitalize satoshi">
            going
          </h6>
          <img
            src={profilePic}
            className="w-4 h-4 rounded-full"
            alt="attendees"
          />
          <h6 className="text-black text-xs font-medium">
            {formatAttendeesDisplay(event.attendees)}
          </h6>
        </li>
      </ul>

      <section className="flex flex-col justify-between text-end h-[100px]">
        <h6 className="text-[#8A9191] text-[12px] font-[500]">
          {timeAgo(type === "created" ? event?.createdAt : event?.respondedAt)}
        </h6>
        <SiteBtn
          name="manage"
          colorPadding="bg-[#AEFC40] py-[4px] px-[16px]"
          onclick={e => {
            e.stopPropagation();
            navigate(`/event/${event.id}`);
          }}
        />
      </section>
    </section>
  );
};

export default EventItem;
