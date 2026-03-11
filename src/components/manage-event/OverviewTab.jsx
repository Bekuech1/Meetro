import { useManageEventContext } from "@/layouts/ManageEventLayout";
import { format } from "date-fns";
import {
  Calendar1,
  Colorfilter,
  LinkCircle,
  Location,
  Map1,
  TickCircle,
  Trash,
  Video,
} from "iconsax-reactjs";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import { categories } from "@/lib/utils";
import Avatar from "../layout-components/Avatar";
import AvatarGroup from "../layout-components/AvatarGroup";
import IconButton from "../layout-components/Buttons/IconButton";
import TagButton from "../layout-components/Buttons/TagButton";
import TextButton from "../layout-components/Buttons/TextButtons";
import Modal from "../layout-components/Modal/Modal";
import DeleteEventModal from "./DeleteEventModal";
import EventDetailsSkeleton from "./EventDetailsSkeleton";
import GuestsTable from "./GuestsTable";
import GuestsTableSkeleton from "./GuestsTableSkeleton";
import NoGuests from "./NoGuests";
import PayoutOverviewSkeleton from "./PayoutOverviewSkeleton";
import PayoutsOverview from "./PayoutsOverview";

function OverviewTab() {
  const { event, loading, handleTabChange } = useManageEventContext();

  if (loading) {
    return (
      <div className="flex flex-col gap-8 w-full">
        {/* Event details skeleton */}
        <EventDetailsSkeleton />

        {/* Payout details skeleton */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between satoshi text-base">
            <h3 className="font-bold text-[#001010]">Payouts</h3>
            <TagButton
              variant="light-purple"
              className="satoshi min-w-0"
              text="See more"
              onClick={() => handleTabChange("payouts")}
            />
          </div>
          <div className="p-6 border border-white rounded-4xl bg-white/50">
            <PayoutOverviewSkeleton />
          </div>
        </div>

        {/* Recent guests skeleton */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between satoshi text-base">
            <h3 className="font-bold text-[#001010]">Guests</h3>
            <TagButton
              variant="light-purple"
              className="satoshi min-w-0"
              text="See all"
              onClick={() => handleTabChange("guests")}
            />
          </div>
          <div className="p-6 border border-white rounded-4xl bg-white/50">
            <GuestsTableSkeleton rows={5} />
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        Event not found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Event details */}

      <div className="sm:p-6 p-4 border border-white rounded-4xl bg-white/50">
        <div className="flex gap-6 md:gap-8 flex-col-reverse md:flex-row mb-4">
          {/* Event image */}
          <div className="aspect-square md:w-80.25 rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <img src={event.image} className="object-fill size-full" />
          </div>
          {/* Event info */}
          <div className="flex-1">
            <div className="flex justify-between gap-4 items-center mb-6">
              <TagButton
                text={event.isPrivate ? "Private Event" : "Public Event"}
                variant="light-cyan"
                className="satoshi font-medium sm:h-9 text-xs sm:text-sm sm:px-2 pointer-events-none"
              />
              {/* Delete event button */}
              <Modal.Open opens="delete-event">
                <TagButton
                  text="Delete Event"
                  className="sm:h-8 h-7 px-2 text-[#DB2863] text-[10px] leading-[14px] sm:text-xs"
                  rightImg={<Trash variant="Bold" />}
                />
              </Modal.Open>
            </div>
            {/* Event title */}
            <div className="flex flex-col gap-3 sm:gap-2 sm:mb-8 mb-4">
              <h2 className="paytone sm:text-[24px] sm:leading-[38px] text-base leading-[22px] text-[#001010]">
                {event.title}
              </h2>
              {/* Event categories */}
              {event.category && event.category.length > 0 && (
                <ul className="flex flex-wrap gap-2 items-center">
                  {event.category.map((cat, index) => (
                    <TagButton
                      key={index}
                      className={twMerge(
                        "pointer-events-none h-5.5 px-1 sm:px-1.5 sm:text-xs sm:h-7.5 text-[10px] leading-[14px] satoshi",
                        categories[cat] ? categories[cat] : "text-[#001010]"
                      )}
                      text={cat}
                    />
                  ))}
                </ul>
              )}
            </div>
            {/* Event time and location */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <IconButton
                  icon={
                    <Calendar1 variant="Bold" className="size-4 sm:size-6" />
                  }
                  variant="tertiary"
                  className="pointer-events-none sm:size-11 size-6"
                />
                <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                  <p className="text-[#001010] ">
                    {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
                  </p>
                  <p className="text-[#8A9191]">
                    {format(new Date(event.startDate), "hh:mmaaa")}
                  </p>
                </div>
              </div>
              {/* Location */}
              {event.location && (
                <div className="flex gap-2 items-center">
                  <IconButton
                    icon={
                      <Location variant="Bold" className="size-4 sm:size-6" />
                    }
                    variant="tertiary"
                    className="pointer-events-none sm:size-11 size-6"
                  />
                  <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                    <p className="text-[#001010] capitalize">
                      {event.location.venue}
                    </p>
                    <p className="text-[#8A9191] capitalize">
                      {event.location.city ? `${event.location.city}, ` : ""}
                      {event.location.state}
                    </p>
                  </div>
                  {event.location.coordinates && (
                    <Link
                      target="_blank"
                      to={`https://maps.google.com/?q=${event.location.coordinates.lat},${event.location.coordinates.lng}`}
                    >
                      <TagButton
                        variant="light-purple"
                        text="View on Map"
                        className="satoshi font-bold px-2 hidden h-8.5 sm:inline-block"
                        rightImg={<Map1 variant="Bold" />}
                      />
                      <IconButton
                        icon={<Map1 variant="Bold" size={16} />}
                        variant="light-purple"
                        className="size-8 sm:hidden"
                      />
                    </Link>
                  )}
                </div>
              )}
              {/* Online event */}
              {event.meetingURL && (
                <div className="flex gap-2 items-center">
                  <IconButton
                    icon={
                      <LinkCircle variant="Bold" className="size-4 sm:size-6" />
                    }
                    variant="tertiary"
                    className="pointer-events-none sm:size-11 size-6"
                  />
                  <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                    <p className="text-[#001010]">Online Event</p>
                    <p className="text-[#8A9191]">{event.meetingURL}</p>
                  </div>
                  <Link to={event.meetingURL} target="_blank">
                    <TagButton
                      variant="light-purple"
                      text="Join Meeting"
                      className="satoshi font-bold px-2 hidden h-8.5 sm:inline-block"
                      rightImg={<Video variant="Bold" />}
                    />
                    <IconButton
                      icon={<Video variant="Bold" size={16} />}
                      variant="light-purple"
                      className="size-8 sm:hidden"
                    />
                  </Link>
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
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-y-6 justify-between">
          {/* Event hosts */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-2">
              <p className="paytone text-xs text-[#B0B5B5] sm:text-sm sm:leading-6">
                Hosted by
              </p>
              <div className="flex items-center satoshi gap-2">
                <Avatar size="xs" />
                <div className="flex flex-col font-medium">
                  <p className="sm:text-base text-sm">
                    {event.host.fullName}
                    {event.cohosts.length > 0 && (
                      <span className="text-[#8A9191]">
                        +{event.cohosts.length} others
                      </span>
                    )}
                  </p>
                  <span className="text-[#8A9191] text-xs">Host</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="paytone text-xs text-[#B0B5B5] sm:text-sm sm:leading-6">
                Attending
              </p>
              <div className="flex gap-1 items-center">
                <AvatarGroup
                  size="md"
                  src={[
                    `${event.guests[0]?.photo ?? ""}`,
                    `${event.guests[1]?.photo ?? ""}`,
                  ]}
                  count={event.guestCount > 2 ? event.guestCount - 2 : 0}
                />
                <TagButton
                  size="lg"
                  text="Going"
                  variant="green"
                  className="satoshi min-w-0 px-2 pointer-events-none gap-1"
                  leftImg={<TickCircle size={12} variant="Bold" />}
                />
              </div>
            </div>
          </div>
          {/* Edit and share event buttons */}
          <div className="flex-[1.6]">
            <div className="flex flex-col-reverse min-[350px]:flex-row min-[350px]:items-end gap-4 sm:gap-0 justify-between">
              <Modal.Open opens="share-event">
                <TextButton
                  text="Share Event"
                  variant="tertiary"
                  className="min-[350px]:flex-1 w-full min-[420px]:w-auto min-[420px]:flex-initial"
                />
              </Modal.Open>
              <div className="flex flex-1 min-[420px]:flex-initial min-[420px]:items-center gap-2 min-[420px]:gap-4 flex-col items-end min-[420px]:flex-row">
                <span className="min-[420px]:text-sm text-[#4A3A74] text-xs satoshi inline-block font-bold">
                  {event.updateCount}/3 edits
                </span>
                <Link to={`/edit-event/${event.slug}`}>
                  <TextButton
                    text="Edit Event"
                    size="lg"
                    className="px-4 w-full min-[420px]:w-auto"
                    variant="primary"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Payout details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between satoshi text-base">
          <h3 className="font-bold text-[#001010]">Payouts</h3>
          <TagButton
            variant="light-purple"
            className="satoshi min-w-0"
            text="See more"
            onClick={() => handleTabChange("payouts")}
          />
        </div>
        {/* Payout overview */}
        <div className="p-6 border border-white rounded-4xl bg-white/50">
          <PayoutsOverview
            availablePayout={event.balance}
            totalReceived={event.totalDonations}
          />
        </div>
      </div>

      {/* Recent guests */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between satoshi text-base">
          <h3 className="font-bold text-[#001010]">Guests</h3>
          <TagButton
            variant="light-purple"
            className="satoshi min-w-0"
            text="See all"
            onClick={() => handleTabChange("guests")}
          />
        </div>
        <div className="p-6 border border-white rounded-4xl bg-white/50">
          {event.guests.length > 0 ? (
            <GuestsTable guests={event.guests} />
          ) : (
            <NoGuests>
              <TextButton text="Invite Guests" variant="tertiary" />
            </NoGuests>
          )}
        </div>
      </div>
      {/* Delete event modal */}
      <DeleteEventModal eventId={event._id} />
    </div>
  );
}

export default OverviewTab;
