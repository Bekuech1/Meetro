import Alert from "@/components/layout-components/Alert";
import Avatar from "@/components/layout-components/Avatar";
import AvatarGroup from "@/components/layout-components/AvatarGroup";
import IconButton from "@/components/layout-components/Buttons/IconButton";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import ConfirmAttendance from "@/components/layout-components/Events/ConfirmAttendance";
import PayChipInModal from "@/components/layout-components/Events/PayChipInModal";
import EventTimerNav from "@/components/layout-components/EventTimerNav";
import ProgressBar from "@/components/layout-components/ProgressBar";
import { useConfirmAttendance } from "@/hooks/useConfirmAttendance";
import { useShareEvent } from "@/hooks/useShareEvent";
import { categories, responseColors } from "@/lib/utils";
import { eventsApi } from "@/services/eventsApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft2,
  ArrowRight2,
  Calendar1,
  Colorfilter,
  LinkCircle,
  Location,
  Maximize1,
  Money3,
  Send2,
  TickCircle,
} from "iconsax-reactjs";
import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { twMerge } from "tailwind-merge";

export default function EventDetails() {
  const { slug } = useParams();
  const { user } = useAuthStore();

  const [searchParams] = useSearchParams();
  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => eventsApi.getEvent(slug),
  });
  const isShared = searchParams.get("shared") === "true";
  const host = event?.host;
  const hostPhoto = host?.photo?.url ? host.photo.url : host?.photo || "";
  const hostName = host?.fullName || user?.fullName || "Host";
  const isHost = event?.userRole === "host" || host?.id === user?.id;

  const { handleShare } = useShareEvent(event);

  // Chip in details
  const chipInDetails = event?.chipInDetails;

  // Attendance confirmation
  const { isPending, handleRespond } = useConfirmAttendance({
    event,
  });

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

  // Going guests and photos
  const goingGuests = Array.isArray(event?.guests)
    ? event.guests
    : [host, ...(event?.cohosts || [])];
  const goingPhotos = goingGuests.slice(0, 2).map(guest => guest?.photo || "");
  const remainingCount = goingGuests.length > 2 ? goingGuests.length - 2 : 0;

  // Text expansion state
  const [textExpanded, setTextExpanded] = useState(false);
  const descriptionLimit = 140;
  const truncatedDescription =
    event?.description && event?.description.length > descriptionLimit
      ? `${event.description.slice(0, descriptionLimit)}...`
      : event?.description;

  const navigate = useNavigate();

  const location = useLocation();
  const previousPage = location.state?.from || document.referrer; // Fallback to document.referrer if state is not available

  const handleNavigateBack = () => {
    const isInternal =
      previousPage &&
      previousPage.startsWith("/") &&
      !previousPage.startsWith("//");
    // Check if previous page exists and is part of the same app (to avoid navigating back to an external site)
    if (isInternal) {
      navigate(-1);
    } else {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }
  };

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;
  return (
    <div className="flex flex-col satoshi min-h-dvh bg-[#F0F0F0]">
      <div className="sticky top-0 z-50">
        <EventTimerNav targetDate={event.startDate} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        {isShared ? (
          <div className="mx-auto max-w-[545px] w-full px-4">
            {/* Top navigation */}
            <div className="py-6 flex justify-between items-center">
              <TagButton
                onClick={handleNavigateBack}
                text="Back"
                variant="tertiary"
                className="h-8 text-xs min-w-0 px-2"
                leftImg={<ArrowLeft2 size={16} />}
              />

              <div className="flex items-center gap-4">
                <TextButton
                  rightImg={<Send2 variant="Bold" />}
                  text="Share"
                  className="min-w-0 px-2 h-8 text-xs sm:h-8 sm:text-xs"
                  variant="tertiary"
                  onClick={handleShare}
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
              <h1 className={`text-2xl leading-8 ${event.font || "paytone"}`}>
                {event.title}
              </h1>
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
                    src={goingPhotos}
                    count={remainingCount}
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
                    className="rounded-[100px]"
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
              {event.userResponse ? (
                <div className=" flex flex-col justify-between gap-6 pb-6 items-start">
                  <div className="flex flex-col items-center text-center satoshi gap-1">
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-[#001010]">
                        {event.userResponse === "going"
                          ? "✅ You’re going!"
                          : "👀 Not Sure Yet?"}
                      </p>
                      <div className="rounded-full border border-[#f9f9f9] pr-2 bg-[#E5E7E3] flex items-center gap-0.5 p-0.5">
                        <Avatar size="xs" src={user.photo} />
                        <p className="text-xs font-medium text-[#001010]">
                          {user.name || user.fullName || user.email || "Guest"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[#8A9191] font-medium">
                      {event.userResponse === "going"
                        ? "We can’t wait to see you there! If your plans change, you can update your RSVP anytime."
                        : "We’ll remind you as the date gets closer, just in case youdecide to come."}
                    </p>
                  </div>
                  <div className="flex gap-6 items-center justify-center w-full">
                    <TextButton
                      text="Invite Friends"
                      variant="tertiary"
                      rightImg={<Send2 variant="Bold" />}
                      onClick={handleShare}
                    />
                    {event.userResponse !== "going" && (
                      <TextButton
                        text="Going"
                        onClick={() => handleRespond("going")}
                        state={isPending ? "loading" : "default"}
                        disabled={isPending}
                        rightImg={<TickCircle variant="Bold" />}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center w-full gap-2 py-4 bg-transparent">
                  <ConfirmAttendance event={event} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <React.Fragment>
            {/* Left content */}
            <div className="w-full lg:w-[461px] items-center lg:items-start bg-[#f0f0f0] lg:fixed lg:top-[52px] lg:bottom-0 lg:left-0 lg:pl-20 z-20 flex flex-col py-8 px-8 gap-4 overflow-y-auto scrollbar-hide">
              <div>
                <TagButton
                  text="Back"
                  variant="tertiary"
                  className="h-8 min-w-0 px-2 mb-4"
                  leftImg={<ArrowLeft2 size={16} />}
                  onClick={handleNavigateBack}
                />
              </div>

              <div>
                <div className="md:size-[349px] size-full overflow-hidden rounded-3xl border-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border-white flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {isHost && (
                <div className="w-full">
                  <Link
                    to={`/manage-event/${event.slug}`}
                    className="w-full inline-block"
                  >
                    <Alert
                      title="You have manage access"
                      size="sm"
                      option="outline"
                      className="mx-auto lg:mx-0 lg:max-w-none rounded-[100px] max-w-[380px]"
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
                </div>
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
            <div className="w-full overflow-hidden  min-w-0 flex flex-col h-full  min-h-[calc(100vh-52px)] bg-white/80 relative border-l border-[#E5E7E3] lg:ml-[461px] lg:w-[calc(100%-461px)] rounded-l-2xl">
              <section className="flex gap-6 flex-col py-6 px-10 pt-9 border-b lg:pr-20 border-[#E5E7E3] ">
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
                      className="min-w-0 px-2"
                      variant="tertiary"
                      onClick={handleShare}
                    />
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
                            categories[cat] ? categories[cat] : "text-[#001010]"
                          )}
                          text={cat}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
              <div className="flex flex-col">
                {(event.startDate ||
                  event.location.state ||
                  event.meetingURL ||
                  event.dressCode) && (
                  <div className="flex flex-col gap-3 px-10 py-6 border-b border-[#E5E7E3] lg:pr-20">
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
                )}
                <div className="space-y-2 py-6 px-10 border-b border-[#E5E7E3] lg:pr-20">
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
                  <div className="space-y-2 py-6 px-10 lg:pr-20">
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
                {event.location.coordinates && (
                  <div className="py-6 px-10 lg:pr-20 flex flex-col border-b border-[#E5E7E3]">
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
                  </div>
                )}

                <div className="flex flex-col py-6 pb-2 px-10 border-b border-[#E5E7E3] lg:pr-20">
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
                {event.userResponse ? (
                  <div className="py-6 px-10 flex justify-between gap-6 items-start lg:pr-20">
                    <div className="flex flex-col satoshi gap-1">
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-[#001010]">
                          {event.userResponse === "going"
                            ? "✅ You’re going!"
                            : "👀 Not Sure Yet?"}
                        </p>
                        <div className="rounded-full border border-[#f9f9f9] pr-2 bg-[#E5E7E3] flex items-center gap-0.5 p-0.5">
                          <Avatar size="xs" src={user.photo} />
                          <p className="text-xs font-medium text-[#001010]">
                            {user.name ||
                              user.fullName ||
                              user.email ||
                              "Guest"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-[#8A9191] font-medium">
                        {event.userResponse === "going"
                          ? "We can’t wait to see you there! If your plans change, you can update your RSVP anytime."
                          : "We’ll remind you as the date gets closer, just in case youdecide to come."}
                      </p>
                    </div>
                    <div className="flex gap-6  items-center">
                      <TextButton
                        text="Invite Friends"
                        variant="tertiary"
                        rightImg={<Send2 variant="Bold" />}
                        onClick={handleShare}
                      />
                      {event.userResponse !== "going" && (
                        <TextButton
                          text="Going"
                          onClick={() => handleRespond("going")}
                          state={isPending ? "loading" : "default"}
                          disabled={isPending}
                          rightImg={<TickCircle variant="Bold" />}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end gap-3 px-10 pb-9 bg-gradient-to-b from-[#e8e8e8]/0 to-[#FFFFFF] pt-6 lg:pr-20">
                    <ConfirmAttendance event={event} />
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      {event.chipInDetails && <PayChipInModal event={event} />}
    </div>
  );
}
