import { LoadingSpinner } from "@/components/create-event/Private";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { groupEvents } from "@/lib/utils";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import useEventStore from "@/stores/eventStore";
import EventItem from "./EventItem";
import EventModal from "./EventModal";
import NoEvents from "./NoEvents";

export default function AttendedEvents() {
  const { fetchAttendedEvents, loadingAttendedEvents, attendedEvents } =
    useEventStore();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selected event id
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Handle body scroll lock for modal using custom hook
  useDisableScroll(isModalOpen);

  // Group events by date
  const groupedEvents = groupEvents(
    attendedEvents.filter(event => event.response === "yes")
  );

  // Fetch events on mount
  useEffect(() => {
    fetchAttendedEvents();
  }, []);

  // Set active event and open modal
  const openModal = id => {
    setSelectedEventId(id);
    setIsModalOpen(true);
  };

  // Remove active event Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  // Loading state
  if (loadingAttendedEvents) {
    return (
      <div className="h-full w-full flex flex-col gap-2 justify-center items-center text-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  // No events attended
  if (attendedEvents.length === 0)
    return <NoEvents message="You haven't been invited to any events yet." />;

  // All attended events are past
  if (Object.keys(groupedEvents).length === 0)
    return (
      <NoEvents message="You have no upcoming events. Get invited to new events or create your own new event." />
    );

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(groupedEvents).map(([date, events]) => (
        <div key={date} className="grid gap-4">
          <div>
            <h5 className="satoshi capitalize text-black text-[16px] font-[900]">
              {format(date, "MMM dd")}
            </h5>
            <p className="satoshi text-[#8A9191] text-[14px] font-[700]">
              {format(date, "EEEE")}
            </p>
          </div>
          {events.map((event, i) => (
            <EventItem
              key={i}
              event={event}
              type="attended"
              openModal={openModal}
            />
          ))}
        </div>
      ))}
      {/* Conditionally render event modal */}
      {isModalOpen && selectedEventId && (
        <EventModal eventId={selectedEventId} closeModal={closeModal} />
      )}
    </div>
  );
}
