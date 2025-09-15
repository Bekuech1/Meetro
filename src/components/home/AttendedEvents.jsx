import { useNavigate } from "react-router";
import useEventStore from "@/stores/eventStore";
import { useEffect, useState, useMemo, useCallback } from "react";
import EventModal from "./EventModal";
import SiteBtn from "../Layout-conponents/SiteBtn";
import { LoadingSpinner } from "@/components/create-event/Private";
import { getProfilePicture } from "../Profile/PersonalProfile";
import { useDisableScroll } from "@/hooks/useDisableScroll";

// Constants
const WEEKDAY_REGEX = /^.*?,\s*/;

const parseEventDate = (rawDate) => {
  if (!rawDate || typeof rawDate !== "string") return null;
  
  const cleanedDateStr = rawDate.replace(WEEKDAY_REGEX, "");
  const parsed = new Date(cleanedDateStr);
  return isNaN(parsed) ? null : parsed;
};

const formatDateKey = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatAttendeesDisplay = (attendees = []) => {
  // Filter and deduplicate "yes" responses
  const uniqueYes = Array.from(
    new Map(
      attendees
        .filter(a => a.response === "yes")
        .map(a => [a.userId, a])
    ).values()
  );

  if (uniqueYes.length === 0) return "no one going yet";

  const firstNames = uniqueYes.map(a => a.name.split(" ")[0]);
  const displayNames = firstNames.slice(0, 2).join(", ");
  const extraCount = firstNames.length - 2;

  return extraCount > 0 ? `${displayNames} +${extraCount}` : displayNames;
};

const timeAgo = (respondedAt) => {
  const diffMs = Date.now() - new Date(respondedAt);
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
};

// Separate component for attended event item
const AttendedEventItem = ({ event, profilePic, onOpenModal }) => {
  const handleCardClick = useCallback(() => {
    onOpenModal(event.id);
  }, [event.id, onOpenModal]);

  const imageUrl = event?.imageUrl 
    ? `${import.meta.env.VITE_IMAGE_URL}/${event.imageUrl}` 
    : "/event-ph1.png";

  const locationText = `${event?.location?.venue}, ${event?.location?.state}`;
  const hostName = event.creator?.name;
  const respondedTime = timeAgo(event?.respondedAt);

  return (
    <section
      className="bg-[#FCFEF9]/50 backdrop-blur-[40px] rounded-[16px] p-3 flex gap-[10px] border border-white cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,16,16,0.08)] hover:scale-[1.01]"
      onClick={handleCardClick}
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
          <h6 className="satoshi text-[#8A9191] sm:hidden text-[10px]">
            {respondedTime}
          </h6>
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
          <img src={profilePic} className="w-4 h-4 rounded-full" alt="attendees" />
          <h6 className="text-black text-xs font-medium">
            {formatAttendeesDisplay(event.attendees)}
          </h6>
        </li>
      </ul>

      <section className="sm:flex hidden flex-col justify-between text-end h-[100px]">
        <h6 className="text-[#8A9191] text-[12px] font-[500] text-nowrap">
          {respondedTime}
        </h6>
      </section>
    </section>
  );
};

// No events component
const NoEventsMessage = ({ message, onCreateEvent }) => (
  <section className="text-center mt-10 text-[#8A9191] text-sm font-semibold">
    <p className="mb-4">{message}</p>
    <SiteBtn
      name="Create event"
      colorPadding="bg-[#AEFC40] py-2 px-6 mt-4"
      onclick={onCreateEvent}
    />
  </section>
);

export default function AttendedEvents() {
  const navigate = useNavigate();
  const { fetchAttendedEvents, loadingAttendedEvents, attendedEvents } = useEventStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  
  const profilePic = useMemo(() => getProfilePicture(), []);

  // Handle body scroll lock for modal using custom hook
  useDisableScroll(isModalOpen);

  // Memoized grouped events calculation
  const groupedEvents = useMemo(() => {
    if (!attendedEvents || attendedEvents.length === 0) return {};
    
    const grouped = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const event of attendedEvents) {
      const parsed = parseEventDate(event.date);
      if (!parsed) continue;
      
      parsed.setHours(0, 0, 0, 0);
      if (parsed < today) continue; // Skip past events

      const key = formatDateKey(parsed);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    }

    // Sort by date
    return Object.keys(grouped)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((acc, date) => {
        acc[date] = grouped[date];
        return acc;
      }, {});
  }, [attendedEvents]);

  // Fetch events on mount
  useEffect(() => {
    fetchAttendedEvents();
  }, [fetchAttendedEvents]);

  // Callback functions
  const handleCreateEvent = useCallback(() => {
    navigate("/create-event");
  }, [navigate]);

  const handleOpenModal = useCallback((id) => {
    setSelectedEventId(id);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  }, []);

  // Loading state
  if (loadingAttendedEvents) {
    return (
      <div className="h-full w-full flex flex-col gap-2 justify-center items-center text-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  // No events attended
  if (attendedEvents.length === 0) {
    return (
      <NoEventsMessage 
        message="You haven't been invited to any events yet."
        onCreateEvent={handleCreateEvent}
      />
    );
  }

  // All attended events are past
  if (Object.keys(groupedEvents).length === 0) {
    return (
      <NoEventsMessage 
        message="You have no upcoming events. Get invited to new events or create your own new event."
        onCreateEvent={handleCreateEvent}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(groupedEvents).map(([date, events]) => (
        <div key={date} className="grid gap-4">
          <div>
            <h5 className="satoshi capitalize text-black text-[16px] font-[900]">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </h5>
            <p className="satoshi text-[#8A9191] text-[14px] font-[700]">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>
          </div>

          {events.map(event => (
            <AttendedEventItem
              key={event.id}
              event={event}
              profilePic={profilePic}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      ))}

      {isModalOpen && (
        <EventModal eventId={selectedEventId} closeModal={handleCloseModal} />
      )}
    </div>
  );
}