import { LoadingSpinner } from "@/components/create-event/Private";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { groupEvents } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import EventItem from "./EventItem";
import EventModal from "./EventModal";
import useEventStore from "@/stores/eventStore";
import NoEvents from "./NoEvents";

export default function MyEvent() {
  // Events context
  const { fetchEvents, loadingMyEvents, myEvents } = useEventStore();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selected event id
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Group events by date
  const groupedEvents = groupEvents(myEvents);

  // Disable body scroll when modal is open
  useDisableScroll(isModalOpen);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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

  // Loading events
  if (loadingMyEvents) {
    return (
      <div className="h-full w-full mt-5 flex flex-col gap-2 justify-center items-center text-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  // No events
  if (myEvents.length === 0)
    return <NoEvents message="You haven't created any events yet." />;

  // No upcoming events
  if (Object.keys(groupedEvents).length === 0)
    return (
      <NoEvents message="You have no upcoming events. All your events are in the past." />
    );

  // Render grouped events
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
            <EventItem key={i} event={event} openModal={openModal} />
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
