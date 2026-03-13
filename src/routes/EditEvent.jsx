import Alert from "@/components/layout-components/Alert";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import EventCohostsModal from "@/components/layout-components/Events/EventCohostsModal";
import EventDateModal from "@/components/layout-components/Events/EventDateModal";
import EventDescriptionModal from "@/components/layout-components/Events/EventDescriptionModal";
import EventDressCodeModal from "@/components/layout-components/Events/EventDressCodeModal";
import EventImage from "@/components/layout-components/Events/EventImage";
import EventLocationModal from "@/components/layout-components/Events/EventLocationModal";
import ImageTemplatesModal from "@/components/layout-components/Events/ImageTemplatesModal";
import EventName from "@/components/layout-components/Inputs/EventName";
import ListInput from "@/components/layout-components/Inputs/ListInput";
import Modal from "@/components/layout-components/Modal/Modal";
import { useManageEventContext } from "@/layouts/ManageEventLayout";
import { format } from "date-fns";
import {
  Add,
  Calendar2,
  Colorfilter,
  Crown,
  Location,
  Timer1,
  Trash,
} from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function EditEvent() {
  const { event } = useManageEventContext();
  const [editedEvent, setEditedEvent] = useState(null);
  // Settings state to control visibility of optional fields.
  const [settings, setSettings] = useState(null);
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
        dressCode: event.dressCode || null,
        eventType: event.eventType || "",
        meetingURL: event.meetingURL || "",
      });

      setSettings({
        hasDescription: event?.description ? true : false,
        hasChipIn: event?.chipInDetails ? true : false,
        hasDressCode: event?.dressCode ? true : false,
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

  // Format description for display in ListInput
  const descriptionFormatted = editedEvent?.description
    ? editedEvent.description.length > 50
      ? editedEvent.description.slice(0, 50) + "..."
      : editedEvent.description
    : "";

  if (!editedEvent) {
    return <div> Loading.... </div>;
  }
  return (
    <div className="max-w-[950px] satoshi mt-10 w-full mx-auto flex flex-col md:flex-row gap-12">
      {/* Image section */}
      <div className="md:sticky md:top-43 md:self-start">
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
            className="w-full h-9 pointer-events-none text-left justify-start"
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
          <Modal.Open opens="event-cohosts">
            <ListInput
              placeholder="Add Cohosts, Collaborators, Speakers e.t.c"
              leftIcon={<Crown variant="Bold" />}
            />
          </Modal.Open>
          {/* Event description */}
          {settings?.hasDescription && (
            <Modal.Open opens="event-description">
              <ListInput
                placeholder="Event Description"
                leftIcon={<Calendar2 variant="Bold" />}
                content={descriptionFormatted}
                rightIcon={
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSettings(prev => ({ ...prev, hasDescription: false }));
                    }}
                  >
                    <Trash variant="Outline" size={16} />
                  </button>
                }
              />
            </Modal.Open>
          )}
          {/* Event dress code */}
          {settings?.hasDressCode && (
            <Modal.Open opens="event-dress-code">
              <ListInput
                placeholder="Dress Code"
                content={`${editedEvent.dressCode ? editedEvent.dressCode.type : ""}${editedEvent.dressCode?.details ? ` - ${editedEvent.dressCode.details}` : ""}`}
                leftIcon={<Colorfilter variant="Bold" />}
                rightIcon={
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSettings(prev => ({ ...prev, hasDressCode: false }));
                    }}
                  >
                    <Trash variant="Outline" size={16} />
                  </button>
                }
              />
            </Modal.Open>
          )}
          {/* Optional fields based on settings */}
          <div className="flex items-center gap-x-4 gap-y-3">
            {!settings?.hasDescription && (
              <TagButton
                text="Description"
                className="satoshi"
                onClick={() =>
                  setSettings(prev => ({
                    ...prev,
                    hasDescription: !prev.hasDescription,
                  }))
                }
                leftImg={<Add />}
              />
            )}
            {!settings?.hasChipIn && (
              <TagButton
                text="Chip In"
                leftImg={<Add />}
                className="satoshi"
                onClick={() => {
                  setSettings(prev => ({
                    ...prev,
                    hasChipIn: !prev.hasChipIn,
                  }));
                }}
              />
            )}
            {!settings?.hasDressCode && (
              <TagButton
                text="Dress code"
                leftImg={<Add />}
                className="satoshi"
                onClick={() => {
                  setSettings(prev => ({
                    ...prev,
                    hasDressCode: !prev.hasDressCode,
                  }));
                }}
              />
            )}
          </div>
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
      {/* Event cohosts modal */}
      <EventCohostsModal />
      {/* Event description modal */}
      <EventDescriptionModal
        descriptionData={editedEvent.description}
        onSave={description => {
          setEditedEvent({ ...editedEvent, description });
        }}
      />
      {/* Event dress code modal */}
      <EventDressCodeModal
        dressCodeData={editedEvent.dressCode}
        onSave={data => {
          setEditedEvent({ ...editedEvent, dressCode: data });
        }}
      />
    </div>
  );
}

export default EditEvent;
