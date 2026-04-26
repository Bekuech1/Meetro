import Alert from "@/components/layout-components/Alert";
import Avatar from "@/components/layout-components/Avatar";
import AvatarGroup from "@/components/layout-components/AvatarGroup";
import IconButton from "@/components/layout-components/Buttons/IconButton";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { format } from "date-fns";
import {
  Calendar,
  Colorfilter,
  Location,
  Map1,
  Money3,
  Timer1,
} from "iconsax-reactjs";

const EventPreview = ({ event }) => {
  const { user } = useAuthStore();
  if (!event) {
    return (
      <div className="bg-[#F0F0F0] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">No event data found</h2>
          <TextButton
            text="Go Back"
            variant="primary"
            onClick={() => navigate("/create-event")}
          />
        </div>
      </div>
    );
  }

  // Format helpers
  const formatDate = dateString => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "EEEE, MMMM d, yyyy");
    } catch {
      return "";
    }
  };

  const formatTime = dateString => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "h:mm a");
    } catch {
      return "";
    }
  };

  const formatLocation = () => {
    if (event.eventType === "online") {
      return event.meetingURL || "Online event";
    }
    return `${event.location?.venue ? `${event.location.venue}, ` : ""}${event.location?.city || ""} ${event.location?.state || ""}`.trim();
  };

  const eventDetails = [
    {
      label: "Time",
      value: formatTime(event.startDate),
      icon: <Timer1 variant="Bulk" size={16} />,
    },
    {
      label: "Date",
      value: formatDate(event.startDate),
      icon: <Calendar variant="Bulk" size={16} />,
    },
    ...(event.dressCode?.type
      ? [
          {
            label: "Dress Code",
            value: event.dressCode.type,
            icon: <Colorfilter variant="Bulk" size={16} />,
          },
        ]
      : []),
    {
      label: "Location",
      value: formatLocation(),
      icon: <Location variant="Bulk" size={16} />,
    },
  ];

  // Mock cohost data for preview
  const mockCohosts = event.cohosts?.length > 0 ? event.cohosts : [];
  const cohostPhotos = mockCohosts.map(cohost => cohost.photo).filter(Boolean);

  return (
    <div className="bg-[#F0F0F0] relative min-h-screen">
      {/* background ellipses */}
      <div className="absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>

      <div className="relative flex flex-col z-10 w-full lg:w-[950px] min-h-screen p-4 pb-12 mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center gap-2 mb-6">
          <button
            onClick={() => navigate("/create-event", { state: { event } })}
          >
            <img src="/arrow-left.svg" alt="" />
          </button>
          <div className="flex gap-2">
            <TagButton
              text="Edit Event"
              variant="primary"
              onClick={() => navigate("/create-event", { state: { event } })}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 flex-1">
          {/* Left Side: Event Image and Host Info */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="aspect-square overflow-hidden rounded-2xl mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Host information */}
              <div className="grid gap-3">
                <span className="text-base text-[#B0B5B5] font-medium paytone">
                  Hosted by
                </span>
                <div className="flex gap-3 items-center">
                  <Avatar size="md" src={user?.photo?.url || ""} />
                  <div className="grid">
                    <span className="text-lg font-medium text-[#001010]">
                      {user?.fullName || "You"}
                    </span>
                    <span className="text-sm font-medium text-[#8A9191]">
                      Host
                    </span>
                  </div>
                </div>
              </div>

              {/* Cohosts */}
              {mockCohosts.length > 0 && (
                <div className="grid gap-3 mt-4">
                  <span className="text-base text-[#B0B5B5] font-medium paytone">
                    Cohosts
                  </span>
                  <div className="flex items-center gap-2">
                    <AvatarGroup
                      size="md"
                      src={cohostPhotos}
                      count={mockCohosts.length}
                    />
                  </div>
                </div>
              )}

              {/* Preview notice */}
              <Alert
                title="This is a preview of your draft event"
                size="sm"
                option="outline"
                type="info"
                className="mt-4"
              />
            </div>
          </div>

          {/* Right Side: Event Details */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {/* Event Title and Status */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                {event.isPrivate && (
                  <TagButton
                    text="Private Event"
                    variant="light-purple"
                    size="lg"
                    className="pointer-events-none"
                  />
                )}
                <TagButton
                  text="Draft"
                  variant="light-cyan"
                  size="sm"
                  className="pointer-events-none"
                />
              </div>
              <h1
                className="text-4xl font-normal paytone text-[#001010] mb-6"
                style={{ fontFamily: event.font || "paytone" }}
              >
                {event.title || "Event Title"}
              </h1>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-medium text-[#001010] paytone mb-4">
                Event Details
              </h3>
              <div className="space-y-4">
                {eventDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center justify-between"
                  >
                    <div className="flex gap-3 items-center">
                      <IconButton variant="tertiary">{item.icon}</IconButton>
                      <div className="grid">
                        <span className="text-sm font-medium text-[#8A9191]">
                          {item.label}
                        </span>
                        <span className="text-base font-medium text-[#001010]">
                          {item.value || "Not set"}
                        </span>
                      </div>
                    </div>
                    {item.label === "Location" &&
                      event.eventType === "offline" &&
                      event.location?.coordinates && (
                        <TagButton
                          rightImg={<Map1 />}
                          text="View on Map"
                          variant="light-purple"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps?q=${event.location.coordinates[0]},${event.location.coordinates[1]}`,
                              "_blank"
                            )
                          }
                        />
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Event Description */}
            {event.description && (
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-medium text-[#8A9191] paytone mb-4">
                  About event
                </h3>
                <p className="text-[#001010] text-base font-medium leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Chip In Details */}
            {event.chipInDetails && event.isPrivate && (
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-medium text-[#8A9191] paytone mb-4">
                  Tickets
                </h3>
                <div className="flex items-center gap-3">
                  <Money3 variant="Bulk" size={20} />
                  <span className="text-lg font-medium text-[#001010]">
                    {event.chipInDetails.chipInType === "fixed" &&
                      `Fixed - ₦${event.chipInDetails.amount}`}
                    {event.chipInDetails.chipInType === "target" &&
                      `Target - ₦${event.chipInDetails.amount}`}
                    {event.chipInDetails.chipInType === "donation" &&
                      `Flexible - ₦${event.chipInDetails.amount}`}
                  </span>
                </div>
              </div>
            )}

            {/* Location Details */}
            {event.eventType === "offline" && event.location && (
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-medium text-[#8A9191] paytone mb-4">
                  Location Details
                </h3>
                <div className="grid gap-2 mb-4">
                  {event.location.venue && (
                    <span className="text-[#001010] text-lg font-medium">
                      {event.location.venue}
                    </span>
                  )}
                  <span className="text-[#8A9191] text-base font-medium">
                    {event.location.city}, {event.location.state}
                  </span>
                  {event.location.directions && (
                    <span className="text-[#8A9191] text-sm font-medium">
                      {event.location.directions}
                    </span>
                  )}
                </div>
                {event.location.coordinates && (
                  <div className="w-full h-[300px] rounded-xl overflow-hidden border border-[#E5E7E3]">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${event.location.coordinates[0]},${event.location.coordinates[1]}&z=15&output=embed`}
                    ></iframe>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <TextButton
                  text="Continue Editing"
                  variant="secondary"
                  onClick={() =>
                    navigate("/create-event", { state: { event } })
                  }
                  className="flex-1"
                />
                <TextButton
                  text="This is a preview"
                  variant="primary"
                  disabled
                  className="flex-1 opacity-50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
