import Alert from "@/components/layout-components/Alert";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import EventChipInModal from "@/components/layout-components/Events/EventChipInModal";
import EventCohostsModal from "@/components/layout-components/Events/EventCohostsModal";
import EventDateModal from "@/components/layout-components/Events/EventDateModal";
import EventDescriptionModal from "@/components/layout-components/Events/EventDescriptionModal";
import EventDressCodeModal from "@/components/layout-components/Events/EventDressCodeModal";
import EventImage from "@/components/layout-components/Events/EventImage";
import EventLocationModal from "@/components/layout-components/Events/EventLocationModal";
import EventTypeModal from "@/components/layout-components/Events/EventTypeModal";
import ImageTemplatesModal from "@/components/layout-components/Events/ImageTemplatesModal";
import EventName from "@/components/layout-components/Inputs/EventName";
import ListInput from "@/components/layout-components/Inputs/ListInput";
import Modal from "@/components/layout-components/Modal/Modal";
import React, { useState } from "react";
import { categories, DEFAULT_EVENT_IMAGES } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft2,
  Eye,
  Timer1,
  Location,
  Crown,
  Category2,
  Calendar2,
  Trash,
  Add,
  Colorfilter,
  Gallery,
} from "iconsax-reactjs";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

function CreateEvent() {
  // Navigation
  const navigate = useNavigate();
  // Image File State
  const [imageFile, setImageFile] = useState(null);
  // Random Image
  const randomImage =
    DEFAULT_EVENT_IMAGES[
      Math.floor(Math.random() * DEFAULT_EVENT_IMAGES.length)
    ];

  // Settings state to control visibility of optional fields
  const [settings, setSettings] = useState({
    hasDescription: false,
    hasDressCode: false,
    hasChipIn: false,
  });

  // Determine if there are no optional settings enabled
  const hasNoSettings =
    !settings?.hasDescription ||
    !settings?.hasChipIn ||
    !settings?.hasDressCode;

  // Event State
  const [event, setEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    image: randomImage,
    font: "paytone",
    isPrivate: true,
    location: {
      venue: "",
      state: "",
      city: "",
      coordinates: null,
      directions: "",
    },
    isPublished: false,
    category: [],
    dressCode: {
      type: "Casual",
      details: "",
    },
    eventType: "offline",
    meetingURL: "",
    cohosts: [],
    chipInDetails: null,
  });
  // Validation state for required fields
  const [validation, setValidation] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    dressCode: "",
    chipIn: "",
    cohosts: "",
    categories: "",
  });

  // Helper function to update location based on event type
  const handleSetLocation = data => {
    switch (data.eventType) {
      case "online":
        setEvent({
          ...event,
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
        setEvent({
          ...event,
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
    event?.eventType === "online"
      ? `Online event - ${event?.meetingURL || "No meeting URL set"}`
      : `${event?.location?.venue ? `${event.location.venue}, ` : ""}${event?.location?.state ? `${event.location.state}` : ""}`;

  // Format description for display in ListInput
  const descriptionFormatted = event?.description
    ? event.description.length > 50
      ? event.description.slice(0, 50) + "..."
      : event.description
    : "";

  // Format cohosts for display in ListInput
  const cohostsFormatted = event?.cohosts?.length
    ? event.cohosts.map(cohost => cohost.name || cohost.email).join(", ")
    : "";

  // Format start date for display in ListInput
  const startDateFormatted = event?.startDate
    ? format(new Date(event.startDate), "EEE,  MMM d, h:mm aa")
    : "";

  // Format end date for display in ListInput
  const endDateFormatted = event?.endDate
    ? format(new Date(event.endDate), "EEE,  MMM d, h:mm aa")
    : "";
  return (
    <div className="flex flex-col satoshi min-h-dvh bg-[#F0F0F0]">
      <main className="flex-1 px-4 flex flex-col max-w-[950px] mx-auto w-full py-10">
        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          {/* Back button */}
          <TagButton
            text="Back"
            onClick={() => navigate(-1)}
            className="h-8 min-w-0 px-2"
            leftImg={<ArrowLeft2 size={16} />}
          />
          {/* Preview button */}
          <TagButton
            text="View Preview"
            className="h-8 min-w-0 px-2"
            rightImg={<Eye variant="Bold" size={16} />}
          />
        </div>
        {/* Create event form */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-10 md:mt-8">
          {/* Image section */}
          <div className="md:sticky md:top-24 md:self-start">
            <h3 className="text-sm text-[#001010] font-bold">Event Image</h3>
            <p className="text-xs mb-4 text-[#8A9191] leading-4.5 font-medium">
              Upload a JPEG or PNG file with a size of 2mb or less
            </p>
            <Modal.Open opens="image-templates">
              <div className="cursor-pointer">
                <EventImage
                  imageUrl={event.image}
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
                    "satoshi min-w-auto h-7.5 px-3 bg-transparent text-[#B0B5B5] border-transparent",
                    event.isPrivate &&
                      "bg-white text-[#011F0F] hover:bg-white hover:text-[#011F0F]"
                  )}
                  onClick={() => setEvent({ ...event, isPrivate: true })}
                />
                <TagButton
                  text="Public"
                  className={twMerge(
                    "satoshi min-w-auto px-3 h-7.5 bg-transparent text-[#B0B5B5] border-transparent",
                    !event.isPrivate &&
                      "bg-white text-[#011F0F] hover:bg-white hover:text-[#011F0F]"
                  )}
                  onClick={() => setEvent({ ...event, isPrivate: false })}
                />
              </div>
              <p className="text-xs text-[#8A9191] mt-2 font-medium">
                {event.isPrivate
                  ? "Shh... it’s exclusive! Only those with the magic link can RSVP."
                  : "Open to all! Let the world (or at least your city) know what’s happening!"}
              </p>
            </div>
            {/* Event title */}
            <EventName
              value={event.title}
              font={event.font}
              error={validation.title}
              onChange={value => {
                setEvent({ ...event, title: value });
                if (validation.title && value.trim())
                  setValidation(prev => ({ ...prev, title: "" }));
              }}
              onSelect={newFont => setEvent({ ...event, font: newFont })}
            />
            {/* Additional details */}
            <div className="flex flex-col gap-3 mt-6">
              <TextButton
                text="Event details"
                variant="tertiary"
                className="w-full h-9 text-sm pointer-events-none text-left justify-start"
              />
              {/* Event date */}
              <Modal.Open opens="event-date">
                <ListInput
                  placeholder="When is your Event?"
                  error={validation.date}
                  content={
                    startDateFormatted
                      ? `${startDateFormatted}${event.endDate ? ` - ${endDateFormatted}` : ""}`
                      : ""
                  }
                  leftIcon={<Timer1 variant="Bold" />}
                />
              </Modal.Open>
              {/* Event location */}
              <Modal.Open opens="event-location">
                <ListInput
                  error={validation.location}
                  placeholder="Where is your Event?"
                  content={locationFormatted}
                  leftIcon={<Location variant="Bold" />}
                />
              </Modal.Open>
              {/* Event cohosts and collaborators */}
              <Modal.Open opens="event-cohosts">
                <ListInput
                  error={validation.cohosts}
                  placeholder="Add Cohosts, Collaborators, Speakers e.t.c"
                  leftIcon={<Crown variant="Bold" />}
                  content={cohostsFormatted}
                />
              </Modal.Open>
              {/* Event categories */}
              <Modal.Open opens="event-type">
                <ListInput
                  placeholder="Event Type"
                  leftIcon={<Category2 variant="Bulk" />}
                  error={validation.categories}
                  tags={
                    event.category.length > 0 ? (
                      <React.Fragment>
                        {event.category.map((cat, index) => (
                          <TagButton
                            key={index}
                            className={twMerge(
                              "pointer-events-none satoshi",
                              categories[cat]
                                ? categories[cat]
                                : "text-[#001010]"
                            )}
                            text={cat}
                          />
                        ))}
                      </React.Fragment>
                    ) : null
                  }
                />
              </Modal.Open>
              {/* Event description */}
              {settings?.hasDescription && (
                <Modal.Open opens="event-description">
                  <ListInput
                    placeholder="Event Description"
                    leftIcon={<Calendar2 variant="Bold" />}
                    content={descriptionFormatted}
                    error={validation.description}
                    rightIcon={
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setEvent(prev => ({
                            ...prev,
                            description: "",
                          }));
                          setSettings(prev => ({
                            ...prev,
                            hasDescription: false,
                          }));
                          setValidation(prev => ({ ...prev, description: "" }));
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
                    content={`${event.dressCode ? event.dressCode.type : ""}${event.dressCode?.details ? ` - ${event.dressCode.details}` : ""}`}
                    error={validation.dressCode}
                    leftIcon={<Colorfilter variant="Bold" />}
                    rightIcon={
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setEvent(prev => ({
                            ...prev,
                            dressCode: {
                              type: "Casual",
                            },
                          }));
                          setSettings(prev => ({
                            ...prev,
                            hasDressCode: false,
                          }));
                          setValidation(prev => ({ ...prev, dressCode: "" }));
                        }}
                      >
                        <Trash variant="Outline" size={16} />
                      </button>
                    }
                  />
                </Modal.Open>
              )}
              {/* Event chip in */}
              {settings?.hasChipIn && event.isPrivate && (
                <Modal.Open opens="event-chip-in">
                  <ListInput
                    placeholder="Chip In"
                    content=""
                    error={validation.chipIn}
                    leftIcon={<Gallery variant="Bold" />}
                    rightIcon={
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setEvent(prev => ({
                            ...prev,
                            chipIn: "",
                          }));
                          setSettings(prev => ({
                            ...prev,
                            hasChipIn: false,
                          }));
                          setValidation(prev => ({ ...prev, chipIn: "" }));
                        }}
                      >
                        <Trash variant="Outline" size={16} />
                      </button>
                    }
                  />
                </Modal.Open>
              )}
              {/* Optional fields based on settings */}
              {hasNoSettings && (
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
                  {!settings?.hasChipIn && event.isPrivate && (
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
              )}
            </div>
            <div className="py-6">
              {/* Save buttons */}
              <div className="flex items-center justify-between">
                <TextButton variant="secondary" text="Save draft" />
                <TextButton variant="primary" text="Create event" />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Image templates modal */}
      <ImageTemplatesModal
        onSave={data => {
          setEvent({ ...event, image: data.image });
          setImageFile(data.file);
        }}
        defaultImage={event.image}
      />
      {/* Event date modal */}
      <EventDateModal
        data={{
          startDate: event.startDate,
          endDate: event.endDate,
        }}
        onSave={newDates => {
          setEvent({
            ...event,
            startDate: newDates.startDate,
            endDate: newDates.endDate,
          });
          setValidation(prev => ({ ...prev, date: "" }));
        }}
      />
      {/* Event location modal */}
      <EventLocationModal
        locationData={event.location}
        eventType={event.eventType}
        meetingURL={event.meetingURL}
        onSave={data => {
          handleSetLocation(data);
          setValidation(prev => ({ ...prev, location: "" }));
        }}
      />
      {/* Event cohosts modal */}
      <EventCohostsModal
        cohostsData={event.cohosts}
        onSave={newCohosts => {
          setEvent({ ...event, cohosts: newCohosts });
          setValidation(prev => ({ ...prev, cohosts: "" }));
        }}
      />
      {/* Event categories modal */}
      <EventTypeModal
        categoriesData={event.category}
        onSave={data => {
          setEvent({ ...event, category: data });
          setValidation(prev => ({ ...prev, categories: "" }));
        }}
      />
      {/* Event description modal */}
      {settings.hasDescription && (
        <EventDescriptionModal
          descriptionData={event.description}
          onSave={description => {
            setEvent({ ...event, description });
            setValidation(prev => ({ ...prev, description: "" }));
          }}
        />
      )}
      {/* Event dress code modal */}
      {settings.hasDressCode && (
        <EventDressCodeModal
          dressCodeData={event.dressCode}
          onSave={data => {
            setEvent({ ...event, dressCode: data });
            setValidation(prev => ({ ...prev, dressCode: "" }));
          }}
        />
      )}
      {/* Event chip in modal */}
      {settings.hasChipIn && event.isPrivate && (
        <EventChipInModal
          chipInData={event.chipInDetails?.type}
          onSave={data => {
            setEvent({ ...event, chipInDetails: data });
            setValidation(prev => ({ ...prev, chipIn: "" }));
          }}
        />
      )}
    </div>
  );
}

export default CreateEvent;
