import Alert from "@/components/layout-components/Alert";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import EventDateModal from "@/components/layout-components/Events/EventDateModal";
import EventImage from "@/components/layout-components/Events/EventImage";
import ImageTemplatesModal from "@/components/layout-components/Events/ImageTemplatesModal";
import EventName from "@/components/layout-components/Inputs/EventName";
import ListInput from "@/components/layout-components/Inputs/ListInput";
import Modal from "@/components/layout-components/Modal/Modal";
import EventLocationModal from "@/components/layout-components/Events/EventLocationModal";
import React, { useEffect, useState } from "react";
import { useManageEventContext } from "@/layouts/ManageEventLayout";
import { format } from "date-fns";
import { Crown, Crown1, Location, Timer1 } from "iconsax-reactjs";
import { twMerge } from "tailwind-merge";

function EditEvent() {
  const { event } = useManageEventContext();
  const [editedEvent, setEditedEvent] = useState(null);
  // File state to hold the uploaded image file.
  const [file, setFile] = useState(null);

  const isPrivate = event?.isPrivate;

  // Set initial event data when it loads and when event changes
  useEffect(() => {
    if (event) {
      setEditedEvent({
        title: event.title || "",
        description: event.description || "",
        startDate: event.startDate
          ? new Date(event.startDate).toISOString().slice(0, 16)
          : "",
        endDate: event.endDate
          ? new Date(event.endDate).toISOString().slice(0, 16)
          : "",
        image: event.image || "",
        font: event.font || "",
        location: {
          venue: event.location?.venue || "",
          state: event.location?.state || "",
          city: event.location?.city || "",
          coordinates: event.location?.coordinates || null,
          directions: event.location?.directions || "",
        },
        eventType: event.eventType || "",
        meetingURL: event.meetingURL || "",
      });
    }
  }, [event]);

  // Format start date for display in ListInput
  const startDateFormatted = editedEvent?.startDate
    ? format(new Date(editedEvent.startDate), "EEE,  MMM d, h:mm aa")
    : "";

  // Helper function to update location based on event type
  const handleSetLocation = data => {
    switch (data.eventType) {
      case "online":
        setEditedEvent({
          ...editedEvent,
          eventType: "online",
          meetingURL: data.meetingURL,
          location: {
            venue: "",
            state: "",
            city: "",
            coordinates: null,
            directions: "",
          },
        });
        break;
      case "offline":
        setEditedEvent({
          ...editedEvent,
          eventType: "offline",
          location: {
            venue: data.location.venue,
            state: data.location.state,
            city: data.location.city,
            coordinates: data.location.coordinates,
            directions: data.location.directions,
          },
          meetingURL: "",
        });
        break;
      default:
    }
  };

  // Format location for display in ListInput
  const locationFormatted =
    editedEvent?.eventType === "online"
      ? `Online event - ${editedEvent?.meetingURL || "No meeting URL set"}`
      : `${editedEvent?.location?.venue ? `${editedEvent.location.venue}, ` : ""}${editedEvent?.location?.state ? `${editedEvent.location.state}` : ""}`;

  if (!editedEvent) {
    return <div> Loading.... </div>;
  }
  return (
    <div className="max-w-[950px] satoshi mt-10 w-full mx-auto flex flex-col md:flex-row gap-12">
      {/* Image section */}
      <div>
        <h3 className="text-sm text-[#001010] font-bold">Event Image</h3>
        <p className="text-xs mb-4 text-[#8A9191] leading-4.5 font-medium">
          Upload a JPEG or PNG file with a size of 2mb or less
        </p>
        <Modal.Open opens="image-templates">
          <div className="cursor-pointer">
            <EventImage
              imageUrl={editedEvent.image}
              className="max-md:max-w-full"
            />
          </div>
        </Modal.Open>
        <div className="mt-4">
          <Alert
            option="outline"
            type="info"
            title="Images with a 1 : 1 ratio (a square) work best"
          />
        </div>
      </div>
      {/* Details section */}
      <div className="flex-1">
        {/* Event privacy */}
        <div className="mb-6">
          <div className="border border-[#F9F9F9] p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
            <TagButton
              text="Private"
              className={twMerge(
                "satoshi min-w-auto h-7.5 px-3 pointer-events-none bg-transparent text-[#B0B5B5] border-transparent",
                isPrivate && "bg-white text-[#011F0F]"
              )}
            />
            <TagButton
              text="Public"
              className={twMerge(
                "satoshi min-w-auto px-3 h-7.5 pointer-events-none bg-transparent text-[#B0B5B5] border-transparent",
                !isPrivate && "bg-white text-[#011F0F]"
              )}
            />
          </div>
          <p className="text-xs text-[#8A9191] mt-2 font-medium">
            {isPrivate
              ? "Shh... it’s exclusive! Only those with the magic link can RSVP."
              : "Open to all! Let the world (or at least your city) know what’s happening!"}
          </p>
        </div>
        {/* Event title */}
        <EventName
          value={editedEvent.title}
          defaultFont={editedEvent.font}
          onChange={value => setEditedEvent({ ...editedEvent, title: value })}
          onSelect={newFont =>
            setEditedEvent({ ...editedEvent, font: newFont })
          }
        />
        {/* Additional details */}
        <div className="flex flex-col gap-3 mt-6">
          <TextButton
            text="Event details"
            variant="tertiary"
            className="w-full pointer-events-none text-left justify-start"
          />
          {/* Event date */}
          <Modal.Open opens="event-date">
            <ListInput
              placeholder="When is your Event?"
              content={startDateFormatted}
              leftIcon={<Timer1 variant="Bold" />}
            />
          </Modal.Open>
          <Modal.Open opens="event-location">
            <ListInput
              placeholder="Where is your Event?"
              content={locationFormatted}
              leftIcon={<Location variant="Bold" />}
            />
          </Modal.Open>
          {/* Event cohosts and collaborators */}
          <Modal.Open>
            <ListInput
              placeholder="Add Cohosts, Collaborators, Speakers e.t.c"
              leftIcon={<Crown variant="Bold" />}
            />
          </Modal.Open>
        </div>
      </div>
      {/* Image templates modal */}
      <ImageTemplatesModal
        onSave={data => {
          setEditedEvent({ ...editedEvent, image: data.image });
          setFile(data.file);
        }}
        defaultImage={editedEvent.image}
      />
      {/* Event date modal */}
      <EventDateModal
        data={{
          startDate: editedEvent.startDate,
          endDate: editedEvent.endDate,
        }}
        onSave={newDates =>
          setEditedEvent({
            ...editedEvent,
            startDate: newDates.startDate,
            endDate: newDates.endDate,
          })
        }
      />
      {/* Event location modal */}
      <EventLocationModal
        locationData={editedEvent.location}
        eventType={editedEvent.eventType}
        meetingURL={editedEvent.meetingURL}
        onSave={data => handleSetLocation(data)}
      />
    </div>
  );
}

export default EditEvent;
