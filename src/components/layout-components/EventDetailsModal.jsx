import Modal from "./Modal/Modal";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@/services/eventsApi";
import { useAuthStore } from "@/stores/useAuthStore";
import Alert from "./Alert";
import TagButton from "./Buttons/TagButton";
import {
  ArrowRight2,
  Calendar1,
  Colorfilter,
  Eye,
  LinkCircle,
  Send2,
  Location,
  TickCircle,
  ArrowLeft2,
  Maximize1,
  SidebarRight,
} from "iconsax-reactjs";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";
import ConfirmationButton from "./Buttons/ConfirmationButton";
import ProgressBar from "./ProgressBar";
import IconButton from "./Buttons/IconButton";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import TextButton from "./Buttons/TextButtons";
import { categories } from "@/lib/utils";
import { Link } from "react-router";
import EventTimerNav from "./EventTimerNav";
import { useModalContext } from "./Modal/ModalContext";

// Event response colors
const responseColors = {
  maybe: "purple",
  going: "green",
};

// ==========================================
// MAIN MODAL COMPONENT
// ==========================================
const EventDetailsModal = ({ eventId }) => {
  const [viewState, setViewState] = useState(1);
  const { data: event, isLoading: loading } = useQuery({
    queryKey: ["event-details", eventId],
    queryFn: () => eventsApi.getEvent(eventId),
  });

  const { close } = useModalContext();

  const [isFullView, setIsFullView] = useState(false);

  const { user } = useAuthStore();
  const host = event?.host;
  const hostPhoto = host?.photo?.url ? host.photo.url : host?.photo || "";
  const hostName = host?.fullName || user?.fullName || "Host";
  const isHost = event?.userRole === "host" || host?.id === user?.id;

  const ToggleFullscreen = () => {
    if (viewState === 2) {
      setViewState(1);
    }
    setIsFullView(prev => !prev);
  };
  const setStatusView = () => setViewState(2);

  const goingGuests = Array.isArray(event?.guests)
    ? event.guests
    : [host, ...(event?.cohosts || [])];
  const goingPhotos = goingGuests.slice(0, 2).map(guest => guest?.photo || "");
  const remainingCount = goingGuests.length > 2 ? goingGuests.length - 2 : 0;

  const [textExpanded, setTextExpanded] = useState(false);
  const descriptionLimit = 140;
  const truncatedDescription =
    event?.description && event?.description.length > descriptionLimit
      ? `${event.description.slice(0, descriptionLimit)}...`
      : event?.description;

  const chipInDetails = event?.chipInDetails;

  // Chip in type
  const chipInType = chipInDetails?.chipInType;

  // Chip in amount
  const chipInAmount =
    chipInType === "fixed"
      ? chipInDetails?.fixedAmount
      : chipInType === "target"
        ? chipInDetails?.targetAmount
        : chipInType === "donation"
          ? chipInDetails?.minAmount
          : null;

  // Event location
  const eventLocation = event?.location?.state || event?.location?.city;

  // Guest avatars
  const guestAvatars =
    event?.guests?.slice(0, 2).map(guest => guest?.photo) || [];

  return (
    <Modal.Window
      padding="p-0 sm:p-0"
      showCloseButton={!isFullView}
      name="event-details-modal"
      desktopWidth={
        !isFullView
          ? "sm:max-w-[1056px] [&>div]:relative"
          : "sm:max-w-full min-h-[100dvh] [&>div]:rounded-none [&>div]:border-none"
      }
      onClose={() => setIsFullView(false)}
    >
      {loading && <div>Loading...</div>}
      {!loading && event && (
        <React.Fragment>
          {isFullView && (
            <div className="sticky top-0 z-50">
              <EventTimerNav targetDate={event.startDate} />
            </div>
          )}
          {/* Event Details */}
          {viewState === 1 && (
            <div className="flex flex-col md:flex-row satoshi">
              {/* Left content */}
              <div
                className={twMerge(
                  "flex flex-col items-center md:items-start py-8 px-8 gap-4 overflow-y-auto scrollbar-hide",
                  !isFullView &&
                    "md:sticky md:top-0 md:self-start md:max-h-[calc(95dvh-54px)]",
                  isFullView &&
                    "lg:w-[461px] lg:bottom-0 lg:left-0 z-20 bg-[#f0f0f0] lg:pl-20 lg:fixed lg:top-[52px]"
                )}
              >
                {isFullView && (
                  <div>
                    <TagButton
                      text="Back"
                      variant="tertiary"
                      className="h-8 text-xs min-w-0 px-2 mb-4"
                      leftImg={<ArrowLeft2 size={16} />}
                      onClick={() => {
                        close();
                        setIsFullView(false);
                      }}
                    />
                  </div>
                )}

                <div>
                  <div
                    className={twMerge(
                      "max-w-[310px] w-full  overflow-hidden rounded-3xl border-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border-white",
                      isFullView && "max-w-[349px]"
                    )}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full aspect-square object-cover"
                    />
                  </div>
                </div>
                {isHost && (
                  <Link
                    to={`/manage-event/${event.slug}`}
                    className="w-full inline-block"
                  >
                    <Alert
                      title="You have manage access"
                      size="sm"
                      option="outline"
                      className="mx-auto rounded-[100px] md:mx-0 max-w-[380px] md:max-w-full"
                      button={
                        <TagButton
                          variant="purple"
                          text="Manage"
                          className="h-6 w-auto px-[6px] min-w-auto"
                          rightImg={<ArrowRight2 size={12} />}
                          size="sm"
                        />
                      }
                    />
                  </Link>
                )}

                <div className="grid gap-1">
                  <span className="text-base text-[#B0B5B5] font-medium paytone">
                    Hosted by
                  </span>
                  <div className="flex gap-1 items-center justify-between">
                    <div className="flex gap-1 items-center">
                      <Avatar size="xs" src={hostPhoto} />
                      <div className="grid">
                        <span className="text-base font-medium text-[#001010]">
                          {hostName}
                        </span>
                        <span className="text-xs font-medium text-[#8A9191]">
                          Host
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-1">
                  <span className="text-base text-[#B0B5B5] font-medium paytone">
                    Attending
                  </span>
                  <div className="flex items-center gap-1">
                    <AvatarGroup
                      count={remainingCount}
                      size="md"
                      src={goingPhotos}
                    />
                    <TagButton
                      leftImg={<TickCircle variant="Bold" />}
                      className="min-w-0 px-2 pointer-events-none"
                      text={goingGuests.length > 0 ? "Going" : "No RSVPs yet"}
                      variant={goingGuests.length > 0 ? "green" : "outline"}
                      size="lg"
                    />
                  </div>
                </div>
              </div>
              {/* Right content */}
              <div
                className={twMerge(
                  "flex-1 overflow-hidden flex flex-col h-full bg-white/80 border-l border-[#E5E7E3] rounded-l-2xl",
                  isFullView && "lg:ml-[461px]"
                )}
              >
                <section
                  className={twMerge(
                    "flex gap-6 flex-col py-6 px-10 border-b border-[#E5E7E3]",
                    isFullView && "lg:pr-20 pt-9"
                  )}
                >
                  <div className="flex gap-2 justify-between">
                    <TagButton
                      text={event.isPrivate ? "Private Event" : "Public Event"}
                      variant="light-purple"
                      size="lg"
                      className="font-bold pointer-events-none satoshi"
                    />
                    <div className="flex gap-4">
                      <TextButton
                        rightImg={<Send2 variant="Bold" />}
                        text="Share"
                        className={twMerge(
                          "min-w-0  px-2 h-8 text-xs sm:h-8 sm:text-xs"
                        )}
                        variant="tertiary"
                      />
                      <TextButton
                        rightImg={
                          isFullView ? (
                            <SidebarRight variant="Bold" />
                          ) : (
                            <Maximize1 variant="Bold" />
                          )
                        }
                        text={isFullView ? "Collapse" : "Expand"}
                        className={twMerge(
                          "min-w-0  px-2 h-8 text-xs sm:h-8 sm:text-xs"
                        )}
                        variant="tertiary"
                        onClick={ToggleFullscreen}
                      />
                      {isFullView && viewState !== 2 && (
                        <TextButton
                          rightImg={<Eye variant="Bold" />}
                          text="View Status"
                          onClick={setStatusView}
                          className={twMerge(
                            "min-w-0  px-2 h-8 text-xs sm:h-8 sm:text-xs"
                          )}
                          variant="tertiary"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col">
                    <h2
                      className={`text-3xl font-normal ${event.font || "paytone"} text-[#001010]`}
                    >
                      {event.title || "No title provided"}
                    </h2>
                    {event.category.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
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
                      </div>
                    )}
                  </div>
                </section>
                <div className="overflow-y-auto flex flex-col scrollbar-hide min-h-0">
                  <div
                    className={twMerge(
                      "flex flex-col gap-3 px-10 py-6 border-b border-[#E5E7E3]",
                      isFullView && "lg:pr-20"
                    )}
                  >
                    {event.startDate && (
                      <div className="flex gap-2 items-center">
                        <IconButton
                          icon={
                            <Calendar1
                              variant="Bold"
                              className="size-4 sm:size-6"
                            />
                          }
                          variant="tertiary"
                          className="pointer-events-none sm:size-11 size-6"
                        />
                        <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                          <React.Fragment>
                            <p className="text-[#001010] ">
                              {format(
                                new Date(event.startDate),
                                "EEEE, MMMM d, yyyy"
                              )}
                            </p>
                            <p className="text-[#8A9191]">
                              {format(new Date(event.startDate), "h:mm a")}
                            </p>
                          </React.Fragment>
                        </div>
                      </div>
                    )}
                    {/* Location */}
                    {event.location.state && (
                      <div className="flex gap-2 items-center">
                        <IconButton
                          icon={
                            <Location
                              variant="Bold"
                              className="size-4 sm:size-6"
                            />
                          }
                          variant="tertiary"
                          className="pointer-events-none sm:size-11 size-6"
                        />
                        <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                          <p className="text-[#001010] capitalize">
                            {event.location.venue ||
                              event.location.state ||
                              event.location.city}
                          </p>
                          {event.location.venue && (
                            <p className="text-[#8A9191] capitalize">
                              {event.location.city
                                ? `${event.location.city}, `
                                : ""}
                              {event.location.state}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {/* Online event */}
                    {event.meetingURL && (
                      <div className="flex gap-2 items-center">
                        <IconButton
                          icon={
                            <LinkCircle
                              variant="Bold"
                              className="size-4 sm:size-6"
                            />
                          }
                          variant="tertiary"
                          className="pointer-events-none sm:size-11 size-6"
                        />
                        <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                          <p className="text-[#001010]">Online Event</p>
                          <p className="text-[#8A9191]">{event.meetingURL}</p>
                        </div>
                      </div>
                    )}
                    {/* Dress code */}
                    {event.dressCode && (
                      <div className="flex gap-2 items-center">
                        <IconButton
                          icon={
                            <Colorfilter
                              variant="Bold"
                              className="size-4 sm:size-6"
                            />
                          }
                          variant="tertiary"
                          className="pointer-events-none sm:size-11 size-6"
                        />
                        <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                          <p className="text-[#001010]">Dress Code</p>
                          <p className="text-[#8A9191] capitalize">
                            {event.dressCode.type}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={twMerge(
                      "space-y-2 py-6 px-10 border-b border-[#E5E7E3]",
                      isFullView && "lg:pr-20"
                    )}
                  >
                    <h3 className="text-base font-medium text-[#8A9191] paytone">
                      About event
                    </h3>
                    <p
                      className={`text-[#001010] text-base font-medium leading-relaxed ${textExpanded ? "" : "line-clamp-3"}`}
                    >
                      {textExpanded
                        ? event.description
                        : truncatedDescription || "No description provided"}
                    </p>
                    {event.description &&
                      event.description.length > descriptionLimit && (
                        <button
                          onClick={() => setTextExpanded(!textExpanded)}
                          className="text-sm font-bold text-[#9E88DB]"
                        >
                          {textExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                  </div>
                  {event.chipInDetails && event.chipInDetails.amount && (
                    <div
                      className={twMerge(
                        "space-y-2 py-6 px-10",
                        isFullView && "lg:pr-20"
                      )}
                    >
                      <h3 className="text-base font-medium text-[#8A9191] paytone">
                        Chip In
                      </h3>
                      {event.chipInDetails.chipInType === "target" && (
                        <ProgressBar
                          current={event.totalDonations}
                          target={event.chipInDetails?.amount}
                        />
                      )}
                      {event.chipInDetails.chipInType === "donation" && (
                        <ProgressBar
                          variant="minimum-amount"
                          amount={event.chipInDetails?.amount}
                        />
                      )}
                      {event.chipInDetails.chipInType === "fixed" && (
                        <ProgressBar
                          variant="amount"
                          amount={event.chipInDetails?.amount}
                        />
                      )}
                    </div>
                  )}
                  {event.location.state && (
                    <div
                      className={twMerge(
                        "py-6 px-10 flex flex-col border-b border-[#E5E7E3]",
                        isFullView && "lg:pr-20"
                      )}
                    >
                      <h3 className="text-base font-medium mb-3 text-[#8A9191] paytone">
                        Location
                      </h3>
                      <div className="grid mb-2">
                        <span className="text-[#001010] text-base font-medium">
                          {event.location.venue ||
                            event.location.state ||
                            event.location.city}
                        </span>
                        {event.location.venue && (
                          <span className="text-[#8A9191] text-base font-medium">
                            {event.location.city
                              ? `${event.location.city}, `
                              : ""}
                            {event.location.state}
                          </span>
                        )}
                      </div>
                      {event.location.coordinates && (
                        <div>
                          <p className="text-sm font-bold text-[#8A9191]">
                            Further directions
                          </p>
                          <div className="w-full rounded-2xl h-[335px] overflow-hidden mt-3 border border-[#E5E7E3]">
                            <iframe
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              loading="lazy"
                              allowFullScreen
                              referrerPolicy="no-referrer-when-downgrade"
                              src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location.venue || event.location.state || event.location.city)}&ll=${event.location.coordinates.lat},${event.location.coordinates.lng}&z=15&output=embed`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={twMerge(
                      "flex flex-col py-6  px-10 border-b border-[#E5E7E3]",
                      isFullView && "lg:pr-20 pb-2"
                    )}
                  >
                    <h3 className="text-base font-medium text-[#8A9191] paytone">
                      Going ({goingGuests.length})
                    </h3>
                    {goingGuests.length > 0 ? (
                      <div className="flex overflow-x-auto pt-2 pl-3 -ml-3 pb-4 scrollbar-hide gap-4">
                        {goingGuests.map((guest, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-center gap-1 w-[112px] shrink-0 h-[90px] p-3 rounded-[12px] bg-[#FFFFFF] shadow-[0px_4px_16px_rgba(0,0,0,0.04)]"
                          >
                            <Avatar size="lg" src={guest.photo} />
                            <span className="text-[#001010] text-[10px] font-medium text-center truncate w-full block">
                              {guest.name
                                ? guest.name
                                : guest.fullName
                                  ? guest.fullName
                                  : guest.email
                                    ? guest.email
                                    : "Guest"}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[#8A9191]">
                        No attendees have RSVP'd yet.
                      </p>
                    )}
                  </div>
                </div>
                {!isFullView && <div className="pb-[120px]"></div>}
                <div
                  className={twMerge(
                    "flex justify-center md:justify-end w-full  md:max-w-[64%] absolute bottom-0 z-50 right-0 gap-4 md:gap-6 pb-6 px-10 bg-transparent pt-6",
                    isFullView &&
                      "lg:pr-20 md:max-w-full max-w-full pb-9  static bottom-auto right-auto"
                  )}
                >
                  <ConfirmationButton variant="not-sure" />
                  <ConfirmationButton variant="going" />
                </div>
              </div>
            </div>
          )}
          {/* Event status */}
          {viewState === 2 && (
            <div className="bg-[#F0F0F0] min-h-[calc(100dvh-52px)]">
              <div className="mx-auto max-w-[545px] px-4">
                {/* Top navigation */}
                <div className="py-6 flex justify-between items-center">
                  <TagButton
                    text="Back"
                    variant="tertiary"
                    className="h-8 text-xs min-w-0 px-2"
                    leftImg={<ArrowLeft2 size={16} />}
                    onClick={() => {
                      setViewState(1);
                    }}
                  />
                  <div className="flex items-center gap-4">
                    <TextButton
                      rightImg={<Send2 variant="Bold" />}
                      text="Share"
                      className="min-w-0 px-2 h-8 text-xs sm:h-8 sm:text-xs"
                      variant="tertiary"
                    />
                    <TextButton
                      rightImg={<SidebarRight variant="Bold" />}
                      text="Collapse"
                      className="min-w-0 px-2 h-8 text-xs sm:h-8 sm:text-xs"
                      variant="tertiary"
                      onClick={ToggleFullscreen}
                    />
                    <Link to={`/events/${event.slug}`}>
                      <TextButton
                        rightImg={<Maximize1 variant="Bold" />}
                        text="More details"
                        className="min-w-0 px-2 h-8 text-xs sm:h-8 sm:text-xs"
                        variant="tertiary"
                      />
                    </Link>
                  </div>
                </div>
                {/* Event details */}
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl leading-8 paytone">{event.title}</h1>
                  {event.category.length > 0 && (
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      {event.category.map((cat, index) => (
                        <TagButton
                          key={index}
                          className={twMerge(
                            "pointer-events-none h-[22px] p-1 text-[10px] leading-3.5 satoshi",
                            categories[cat] ? categories[cat] : "text-[#001010]"
                          )}
                          text={cat}
                        />
                      ))}
                    </div>
                  )}
                  <div
                    className={twMerge(
                      "max-w-[381px] my-6 w-full overflow-hidden rounded-3xl "
                    )}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full aspect-square object-cover"
                    />
                  </div>
                  {/* Event date */}
                  {event.startDate && (
                    <div className="flex gap-2 items-center">
                      <IconButton
                        icon={
                          <Calendar1
                            variant="Bold"
                            color="#866AD2"
                            className="size-4 sm:size-6"
                          />
                        }
                        variant="tertiary"
                        className="pointer-events-none sm:size-11 size-6"
                      />
                      <div className="flex flex-1  satoshi sm:text-base text-sm font-medium">
                        <React.Fragment>
                          <p className="text-[#001010] ">
                            {format(
                              new Date(event.startDate),
                              "EEEE, MMMM d, yyyy"
                            )}
                          </p>
                          <p className="text-[#8A9191] ml-2">
                            {format(new Date(event.startDate), "h:mm a")}
                          </p>
                        </React.Fragment>
                      </div>
                    </div>
                  )}
                  {/* Event tags */}
                  <div className="flex-wrap items-center gap-1 mb-6 mt-2 flex">
                    {/* Location */}
                    {eventLocation && (
                      <TagButton
                        size="lg"
                        text={eventLocation}
                        variant="light-purple"
                        className="satoshi bold min-w-0 pointer-events-none px-2"
                        leftImg={<Location size="12" variant="Bold" />}
                      />
                    )}
                    {/* Chip in type */}
                    {chipInDetails && chipInAmount && (
                      <TagButton
                        size="lg"
                        text={`${chipInType === "fixed" ? "Fixed" : chipInType === "target" ? "Target" : "From"} - ${formatNaira(chipInAmount)}`}
                        variant="light-purple"
                        className="satoshi bold min-w-0 pointer-events-none px-2"
                        leftImg={<Money3 size={12} variant="Bold" />}
                      />
                    )}
                    {/* Guest count */}
                    {event?.guests && (
                      <AvatarGroup
                        size="md"
                        src={guestAvatars}
                        count={event?.guests.length - guestAvatars.length}
                      />
                    )}
                    {/* User response */}
                    {event?.userResponse && (
                      <TagButton
                        size="lg"
                        text={event.userResponse}
                        variant={responseColors[event.userResponse]}
                        className="satoshi bold min-w-0 pointer-events-none px-2"
                        leftImg={<TickCircle size={12} variant="Bold" />}
                      />
                    )}
                  </div>
                  {/* Manage Event Button */}
                  {isHost && (
                    <Link
                      to={`/manage-event/${event.slug}`}
                      className="w-full inline-block mb-2.5"
                    >
                      <Alert
                        title="You have manage access"
                        size="sm"
                        option="outline"
                        className="mx-auto rounded-[100px] md:mx-0 max-w-[380px] md:max-w-full"
                        button={
                          <TagButton
                            variant="purple"
                            text="Manage"
                            className="h-6 w-auto px-[6px] min-w-auto"
                            rightImg={<ArrowRight2 size={12} />}
                            size="sm"
                          />
                        }
                      />
                    </Link>
                  )}
                  <div
                    className={twMerge(
                      "flex justify-center w-full gap-2 py-4 bg-transparent"
                    )}
                  >
                    <ConfirmationButton variant="not-sure" />
                    <ConfirmationButton variant="going" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </Modal.Window>
  );
};

export default EventDetailsModal;
