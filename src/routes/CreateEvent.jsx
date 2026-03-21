import Alert from "@/components/layout-components/Alert";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import EventDateModal from "@/components/layout-components/Events/EventDateModal";
import EventImage from "@/components/layout-components/Events/EventImage";
import ImageTemplatesModal from "@/components/layout-components/Events/ImageTemplatesModal";
import EventName from "@/components/layout-components/Inputs/EventName";
import ListInput from "@/components/layout-components/Inputs/ListInput";
import Modal from "@/components/layout-components/Modal/Modal";
import { DEFAULT_EVENT_IMAGES } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft2, Eye, Timer1 } from "iconsax-reactjs";
import { useState } from "react";
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
    dressCode: null,
    eventType: "",
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
      <main className="flex-1 px-4 flex flex-col max-w-[950px] mx-auto w-full mt-10">
        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 sticky top-0 z-50 bg-transparent">
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
          <div className="md:sticky md:top-43 md:self-start">
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
    </div>
  );
}

export default CreateEvent;
