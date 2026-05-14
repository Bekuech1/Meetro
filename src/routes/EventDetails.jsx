import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@/services/eventsApi";
import { format } from "date-fns";

import { ArrowCircleLeft2, Send2, Maximize1, Calendar1, Location, Money3, ArrowRight2 } from "iconsax-reactjs";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import EventStatus from "@/components/layout-components/EventStatus";
import IconButton from "@/components/layout-components/Buttons/IconButton";
import AvatarGroup from "@/components/layout-components/AvatarGroup";
import Alert from "@/components/layout-components/Alert";
import ConfirmationButton from "@/components/layout-components/Buttons/ConfirmationButton";
import { useAuthStore } from "@/stores/useAuthStore";
import EventTimerNav from "@/components/layout-components/EventTimerNav";
import AttendanceStatus from "@/components/layout-components/AttendanceStatus";

// 👇 Import your newly extracted component here 
// (Make sure the path matches where you saved the file)
import EventExpandedView from "@/components/layout-components/EventExpandedView"; 

const EventDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  // Fetch event details using the slug
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => eventsApi.getEvent(slug),
    enabled: !!slug,
  });

  // Placeholder handlers for UI interactions
  const onClose = () => navigate(-1); // Goes back to the previous page
  const handleShare = () => console.log("Share clicked");
  const cycleViewState = () => console.log("Cycle view state clicked");

  if (isLoading) {
    return <div className="p-10 text-center">Loading event details...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="p-10 text-center">Event not found.</div>;
  }

  // Map backend event structure to the format your UI expects
  const event = {
    title: data.title || "Untitled Event",
    date: data.startDate
      ? (() => {
        const start = format(new Date(data.startDate), "MMMM d, yyyy");
        const end = data.endDate ? format(new Date(data.endDate), "MMMM d, yyyy") : null;
        return end && start !== end ? `${start} - ${end}` : start;
      })()
      : "TBD",
    time: data.startDate
      ? (() => {
        const start = format(new Date(data.startDate), "h:mma").toLowerCase();
        const end = data.endDate ? format(new Date(data.endDate), "h:mma").toLowerCase() : null;
        return end && start !== end ? `${start} - ${end}` : start;
      })()
      : "TBD",
    startDate: data.startDate,
    dressCode: data.dressCode?.type === "Custom" ? data.dressCode?.details : data.dressCode?.type,
    host: data.host || null,
    building: data.location?.venue || "",
    location: data.location?.state || "Location TBD",
    furtherDirections: data.location?.directions || "",
    going: data.guests || [],
    latitude: data.location?.coordinates?.lat || 0,
    longitude: data.location?.coordinates?.lng || 0,
    image: data.image || "",
    description: data.description || "No description available.",
    chipInDetails: data.chipInDetails || null,
    totalDonations: data.totalDonations || 0,
    userRole: data.userRole || "",
    userResponse: data.userResponse || "",
    guestCount: data.guestCount || 0,
    isPrivate: data.isPrivate,
    cohosts: data.cohosts || [],
    slug: data.slug || "",
  };

  // Mocked guest data properties for the UI
  const goingPhotos = event.going.map(guest => guest.photoUrl).filter(Boolean);
  const remainingCount = Math.max(0, event.guestCount - goingPhotos.length);

  // 👇 The updated logged-in user block
  if (user) {
    return (
      <EventExpandedView 
        event={event} 
        onClose={onClose} 
        onCycleView={cycleViewState} 
      />
    );
  }

  // Guest View (Not Logged In)
  return (
    <div className="w-full h-screen flex flex-col">
      <main className="flex flex-col place-items-center flex-1">
        <EventTimerNav targetDate={event?.startDate} onClick={() => navigate("/home")} />
        <section className="w-[513px] h-fit py-6 flex justify-between">
          <TagButton text="Back" leftImg={<ArrowCircleLeft2 size={16} variant='Bold' />} variant="white" size="lg" onClick={onClose} />
          <div className="flex gap-4">
            <TagButton text="share" rightImg={<Send2 color="black" variant="Bold" />} variant="white" size="lg" onClick={handleShare} />
            <TagButton text="Collapse" rightImg={<Maximize1 color="black" variant="Bold" />} variant="white" size="lg" onClick={cycleViewState} />
          </div>
        </section>

        <section className="w-[513px] h-fit flex flex-col gap-6 place-items-center">
          <div className="grid gap-4 place-items-center">
            <div className="grid text-center place-items-center">
              <EventStatus title="draft" size="sm" color="bluegreen" />
              <h1 className="paytone text-2xl font-normal">{event.title}</h1>
            </div>
          </div>

          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="size-[381px] rounded-3xl aspect-square object-cover"
            />
          )}

          <div className="grid gap-2 place-items-center">
            <div className="size-fit flex gap-2 items-center">
              <IconButton icon={<Calendar1 variant="Bold" color="#866AD2" />} variant="tertiary" />
              <h6 className="satoshi text-base font-medium text-black">
                {event.date} <span className="text-[#8A9191] ml-2">{event.time}</span>
              </h6>
            </div>

            <div className="size-fit flex gap-2 items-center">
              <TagButton size="md" text={event.location} variant="light-purple" leftImg={<Location color="#7A60BF" variant="Bold" />} />

              {event.chipInDetails?.amount && (
                <TagButton text={`From - ₦${event.chipInDetails.amount}`} variant="light-purple" leftImg={<Money3 color="#7A60BF" variant="Bold" />} />
              )}

              <AvatarGroup
                size="sm"
                count={remainingCount}
                src={goingPhotos}
              />

              {event.userResponse === "going" && (
                <AttendanceStatus status="going" />
              )}
              {event.userResponse === "not-sure" && (
                <AttendanceStatus status="not-sure" />
              )}
              {event.userResponse === "not-going" && (
                <AttendanceStatus status="not-going" />
              )}
            </div>
          </div>

          {event.userRole === "host" && (
            <Alert
              title="You have manage access to this event"
              size='sm'
              option='outline'
              onClick={() => console.log("Action triggered!")}
              button={<TagButton variant="purple" text='Manage' rightImg={<ArrowRight2 size={12} />} size='sm' className='border-0' />}
            />
          )}
        </section>

        <section className="w-full flex justify-center p-4 mt-auto bg-gradient-to-b from-[#E8E8E8]/0 to-[#E8E8E8]">
          <div className="w-[513px] flex gap-2">
            <ConfirmationButton variant="going" />
            <ConfirmationButton variant="not-sure" onClick={() => console.log("clicked")} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventDetails;