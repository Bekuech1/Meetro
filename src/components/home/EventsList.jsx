import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { eventsApi } from "@/services/eventsApi";
import { useQuery } from "@tanstack/react-query";
import { groupEventsByDate } from "@/lib/utils";
import { format } from "date-fns";
import TagButton from "../layout-components/Buttons/TagButton";
import NoEvents from "./NoEvents";
import EventDate from "../layout-components/EventDate";
import React, { useState } from "react";
import EventItem from "./EventItem";
import EventItemsLoader from "./EventItemsLoader";
import Modal from "../layout-components/Modal/Modal";
import EventDetailsModal from "../layout-components/EventDetailsModal";

function EventsList() {
  // Get filter from URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  // Handle tab change
  const handleTabChange = value => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("filter", value);
    setSearchParams(newSearchParams);
  };

  // Fetch user events based on filter
  const {
    data: events,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["user-events", filter],
    queryFn: () => eventsApi.getUserEvents(filter),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const [activeEventId, setActiveEventId] = useState(null);

  // Group events by date for display
  const groupedEvents = events ? groupEventsByDate(events) : {};

  return (
    <Modal>
      <div className="max-w-[680px] min-h-full w-full mx-auto">
        <section className="flex justify-between flex-col min-[500px]:flex-row gap-4 items-center h-fit mt-10 mb-6">
          <h1 className="paytone capitalize text-[#077D8A] leading-[22px] text-[30px] font-[400]">
            my events
          </h1>
          {/* Filter tabs */}
          <div className="border border-[#F9F9F9] p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
            <TagButton
              text="All"
              size="xs"
              className={twMerge(
                "satoshi min-w-auto px-2",
                filter === "all"
                  ? "hover:bg-white bg-white text-[#011F0F]"
                  : "bg-transparent text-[#B0B5B5] border-transparent"
              )}
              onClick={() => handleTabChange("all")}
            />
            <TagButton
              text="Upcoming"
              size="xs"
              className={twMerge(
                "satoshi min-w-auto px-2",
                filter === "upcoming"
                  ? "hover:bg-white bg-white text-[#011F0F]"
                  : "bg-transparent text-[#B0B5B5] border-transparent"
              )}
              onClick={() => handleTabChange("upcoming")}
            />
            <TagButton
              text="Past"
              size="xs"
              className={twMerge(
                "satoshi min-w-auto px-2",
                filter === "past"
                  ? "hover:bg-white bg-white text-[#011F0F]"
                  : "bg-transparent text-[#B0B5B5] border-transparent"
              )}
              onClick={() => handleTabChange("past")}
            />
          </div>
        </section>
        {/* Events list */}
        {loading ? (
          <EventItemsLoader />
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <React.Fragment>
            {events?.length > 0 ? (
              <React.Fragment>
                {Object.entries(groupedEvents).map(
                  ([date, dateEvents], index) => (
                    <div key={index} className="flex flex-col items-center">
                      <EventDate
                        date={date}
                        className={index !== 0 ? "mt-4" : ""}
                      />
                      <div className="flex flex-col w-full gap-2">
                        {dateEvents.map((event, index) => {
                          return (
                            <Modal.Open
                              onOpen={() => setActiveEventId(event._id)}
                              key={index}
                              opens={"event-details-modal"}
                            >
                              <EventItem event={event} />
                            </Modal.Open>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </React.Fragment>
            ) : (
              <NoEvents
                message={
                  filter === "all"
                    ? "You haven’t created any events yet. Get started by creating your first event!"
                    : filter === "upcoming"
                      ? "You don’t have any upcoming events. All your events are in the past."
                      : "You don’t have any past events yet. Attend some events to see them here."
                }
              />
            )}
          </React.Fragment>
        )}
      </div>

      {/* Render all event modals */}

      <EventDetailsModal eventId={activeEventId} />
    </Modal>
  );
}

export default EventsList;
