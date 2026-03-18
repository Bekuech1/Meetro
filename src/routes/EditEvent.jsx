import Alert from "@/components/layout-components/Alert";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
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
import { useManageEventContext } from "@/layouts/ManageEventLayout";
import { categories } from "@/lib/utils";
import { format } from "date-fns";
import {
  Add,
  Calendar2,
  Category2,
  Colorfilter,
  Crown,
  Location,
  Timer1,
  Trash,
} from "iconsax-reactjs";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function EditEvent() {
  const { event } = useManageEventContext();
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
  // Initial event data for comparison and undo functionality
  const [initialEvent, setInitialEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  // Settings state to control visibility of optional fields.
  const [settings, setSettings] = useState(null);
  // File state to hold the uploaded image file.
  const [imageFile, setImageFile] = useState(null);
  // Show update count alert
  const [showUpdateAlert, setShowUpdateAlert] = useState(true);

  // Event privacy state derived from event data
  const isPrivate = event?.isPrivate;

  // Set initial event data when it loads and when event changes
  useEffect(() => {
    if (event) {
      const eventData = {
        title: event.title || "",
        description: event.description || "",
        startDate: event.startDate
          ? new Date(event.startDate).toISOString().slice(0, 16)
          : "",
        endDate: event.endDate
          ? new Date(event.endDate).toISOString().slice(0, 16)
          : "",
        image: event.image || "",
        font: event.font || "paytone",
        location: {
          venue: event.location?.venue || "",
          state: event.location?.state || "",
          city: event.location?.city || "",
          coordinates: event.location?.coordinates || null,
          directions: event.location?.directions || "",
        },
        category: event.category || [],
        dressCode: event.dressCode || null,
        eventType: event.eventType || "",
        meetingURL: event.meetingURL || "",
        cohosts: event.cohosts || [],
        updateCount: event.updateCount || 0,
        chipInDetails: event.chipInDetails || null,
      };

      setInitialEvent(eventData);
      setEditedEvent(eventData);

      setSettings({
        hasDescription: eventData?.description ? true : false,
        hasChipIn: eventData?.chipInDetails ? true : false,
        hasDressCode: eventData?.dressCode ? true : false,
      });
    }
  }, [event]);

  // Clean up object URLs when component unmounts or when image changes
  useEffect(() => {
    return () => {
      if (editedEvent?.image && editedEvent.image.startsWith("blob:")) {
        URL.revokeObjectURL(editedEvent.image);
      }

      // Also check cohosts for any blob URLs and revoke them
      if (editedEvent?.cohosts?.length) {
        editedEvent.cohosts.forEach(cohost => {
          if (cohost.photo && cohost.photo.startsWith("blob:")) {
            URL.revokeObjectURL(cohost.photo);
          }
        });
      }
    };
  });

  // Format start date for display in ListInput
  const startDateFormatted = editedEvent?.startDate
    ? format(new Date(editedEvent.startDate), "EEE,  MMM d, h:mm aa")
    : "";

  // Format end date for display in ListInput
  const endDateFormatted = editedEvent?.endDate
    ? format(new Date(editedEvent.endDate), "EEE,  MMM d, h:mm aa")
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

  // Undo changes handler
  const handleUndoChanges = () => {
    setEditedEvent(initialEvent);
    setSettings({
      hasDescription: initialEvent.description ? true : false,
      hasChipIn: initialEvent.chipInDetails ? true : false,
      hasDressCode: initialEvent.dressCode ? true : false,
    });
    setImageFile(null);
    setValidation({
      title: "",
      date: "",
      location: "",
      description: "",
      dressCode: "",
      chipIn: "",
      cohosts: "",
      categories: "",
    });
  };

  // Determine if there are no optional settings enabled
  const hasNoSettings =
    !settings?.hasDescription ||
    !settings?.hasChipIn ||
    !settings?.hasDressCode;

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

  // Format cohosts for display in ListInput
  const cohostsFormatted = editedEvent?.cohosts?.length
    ? editedEvent.cohosts.map(cohost => cohost.name || cohost.email).join(", ")
    : "";

  // Handle save changes
  const handleSaveChanges = () => {
    if (!validateRequiredFields()) {
      return;
    }
  };

  // Validate fields
  const validateRequiredFields = () => {
    // Errors are strings
    const errors = {};

    if (!editedEvent.title.trim()) {
      errors.title = "Event title is required.";
    }
    if (!editedEvent.startDate) {
      errors.date = "Event start date and time are required.";
    }

    if (!editedEvent.location.state.trim() && !editedEvent.meetingURL.trim()) {
      errors.location = "Event location is required.";
    }

    if (editedEvent.cohosts.length <= 0) {
      errors.cohosts = "At least one cohost is required.";
    }

    if (editedEvent.category.length <= 0) {
      errors.categories = "At least one event category is required.";
    }

    // Optional fields
    if (settings?.hasDescription && !editedEvent.description.trim()) {
      errors.description = "Event description is required.";
    }
    if (settings?.hasDressCode && !editedEvent.dressCode?.type) {
      errors.dressCode = "Event dress code is required.";
    }
    if (settings?.hasChipIn && !editedEvent.chipInDetails) {
      errors.chipIn = "Event chip-in details are required.";
    }

    setValidation(errors);
    return Object.values(errors).every(value => value === "");
  };

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
          font={editedEvent.font}
          error={validation.title}
          onChange={value => {
            setEditedEvent({ ...editedEvent, title: value });
            if (validation.title && value.trim())
              setValidation(prev => ({ ...prev, title: "" }));
          }}
          onSelect={newFont =>
            setEditedEvent({ ...editedEvent, font: newFont })
          }
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
                  ? `${startDateFormatted}${editedEvent.endDate ? ` - ${endDateFormatted}` : ""}`
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
                editedEvent.category.length > 0 ? (
                  <React.Fragment>
                    {editedEvent.category.map((cat, index) => (
                      <TagButton
                        key={index}
                        className={twMerge(
                          "pointer-events-none  satoshi",
                          categories[cat] ? categories[cat] : "text-[#001010]"
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
                rightIcon={
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setEditedEvent(prev => ({ ...prev, description: "" }));
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
                      setEditedEvent(prev => ({
                        ...prev,
                        dressCode: {
                          type: "Casual",
                        },
                      }));
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
          )}
        </div>
        <div className="py-6">
          {/* Amount of edits */}
          {showUpdateAlert && (
            <Alert
              type="info"
              option="outline"
              className="mb-4 !rounded-2xl"
              subtitle="You can update your event details but not forever 😅
To keep things neat for your guests, you can only make up to 3 major edits (like name, date, or location)."
              onClick={() => setShowUpdateAlert(false)}
              title={
                <span className="flex justify-between items-center">
                  <span>✏️ Heads up, Creator!</span>
                  <span>{editedEvent.updateCount}/3 edits</span>
                </span>
              }
            />
          )}
          {/* Save buttons */}
          <div className="flex items-center justify-between">
            <TextButton
              variant="secondary"
              text="Undo Changes"
              onClick={handleUndoChanges}
            />
            <TextButton
              variant="primary"
              text="Save Changes"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </div>
      {/* Image templates modal */}
      <ImageTemplatesModal
        onSave={data => {
          setEditedEvent({ ...editedEvent, image: data.image });
          setImageFile(data.file);
        }}
        defaultImage={editedEvent.image}
      />
      {/* Event date modal */}
      <EventDateModal
        data={{
          startDate: editedEvent.startDate,
          endDate: editedEvent.endDate,
        }}
        onSave={newDates => {
          setEditedEvent({
            ...editedEvent,
            startDate: newDates.startDate,
            endDate: newDates.endDate,
          });
          setValidation(prev => ({ ...prev, date: "" }));
        }}
      />
      {/* Event location modal */}
      <EventLocationModal
        locationData={editedEvent.location}
        eventType={editedEvent.eventType}
        meetingURL={editedEvent.meetingURL}
        onSave={data => {
          handleSetLocation(data);
          setValidation(prev => ({ ...prev, location: "" }));
        }}
      />
      {/* Event cohosts modal */}
      <EventCohostsModal
        cohostsData={editedEvent.cohosts}
        onSave={newCohosts => {
          setEditedEvent({ ...editedEvent, cohosts: newCohosts });
          setValidation(prev => ({ ...prev, cohosts: "" }));
        }}
      />
      {/* Event categories modal */}
      <EventTypeModal
        categoriesData={editedEvent.category}
        onSave={data => {
          setEditedEvent({ ...editedEvent, category: data });
          setValidation(prev => ({ ...prev, categories: "" }));
        }}
      />
      {/* Event description modal */}
      {settings.hasDescription && (
        <EventDescriptionModal
          descriptionData={editedEvent.description}
          onSave={description => {
            setEditedEvent({ ...editedEvent, description });
          }}
        />
      )}
      {/* Event dress code modal */}
      {settings.hasDressCode && (
        <EventDressCodeModal
          dressCodeData={editedEvent.dressCode}
          onSave={data => {
            setEditedEvent({ ...editedEvent, dressCode: data });
          }}
        />
      )}
    </div>
  );
}

export default EditEvent;
