import InstagramIcon from "@/assets/icons/InstagramIcon";
import BottomNav from "@/components/event-dashboard/BottomNavigation";
import EventItem from "@/components/home/EventItem";
import EventItemsLoader from "@/components/home/EventItemsLoader";
import NoEvents from "@/components/home/NoEvents";
import Avatar from "@/components/layout-components/Avatar";
import IconButton from "@/components/layout-components/Buttons/IconButton";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import React, { useState } from "react";
import { eventsApi } from "@/services/eventsApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar1, Location } from "iconsax-reactjs";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import EventDetailsModal from "@/components/layout-components/EventDetailsModal";
import Modal from "@/components/layout-components/Modal/Modal";

function Profile() {
  // Auth store
  const { user } = useAuthStore();

  // State for active event in modal
  const [activeEventId, setActiveEventId] = useState(null);
  // Filter state
  const [filter, setFilter] = useState("all");
  // Fetch past user events
  const {
    data: events,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["user-events", "past"],
    queryFn: () => eventsApi.getUserEvents("past"),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch user events count
  const { data: userEventsCount, isLoading: isUserEventsCountLoading } =
    useQuery({
      queryKey: ["userEventsCount"],
      queryFn: eventsApi.getUserEventsCount,
      onError: error => {
        console.log(
          "Error fetching user events count:",
          error?.response?.data?.message || error.message
        );
      },
    });

  // Filter events client-side and attach isHost flag
  const filteredEvents = (events || []).filter(event => {
    const isHost = String(event.host?._id || event.host) === String(user._id);
    event._isHost = isHost;
    if (filter === "hosted") return isHost;
    if (filter === "attended") return !isHost;
    return true; // "all"
  });

  return (
    <main className="bg-[#F0F0F0] h-full relative flex-1 flex flex-col w-full">
      <div className="flex-1 satoshi">
        <div className="max-w-[1120px] min-h-full w-full mx-auto">
          <div className="flex justify-between flex-col md:flex-row gap-y-6 gap-x-12  h-fit mt-4 md:mt-10">
            {/* Profile details */}
            <div className="bg-white self-start p-6 rounded-4xl relative flex flex-col gap-4 min-w-full md:min-w-[332px]">
              {/* Edit profile button */}
              <Link to="/settings?tab=edit-profile">
                <TextButton
                  text="Edit Profile"
                  variant="primary"
                  className="min-w-0 absolute top-6 right-6"
                  smallButton
                />
              </Link>
              {/* User avatar */}
              <Avatar size="xl" src={user.photo} />
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] leading-[12px] paytone">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm font-medium text-[#8A9191]">
                  {user.email}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {/* Join date */}
                <div className="flex gap-2 items-center">
                  <IconButton
                    icon={<Calendar1 variant="Bold" className="size-4" />}
                    variant="tertiary"
                    className="pointer-events-none size-6 sm:size-6"
                  />
                  <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                    <p className=" text-[#8A9191]">Joined</p>
                    <p className="text-[#001010]">
                      {format(new Date(user.createdAt), "EEEE, MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                {/* Location */}
                {user.address && (
                  <div className="flex gap-2 items-center">
                    <IconButton
                      icon={<Location variant="Bold" className="size-4" />}
                      variant="tertiary"
                      className="pointer-events-none size-6 sm:size-6"
                    />
                    <div className="flex flex-1 flex-col satoshi sm:text-base text-sm font-medium">
                      <p className="text-[#8A9191] capitalize">Location</p>
                      <p className="text-[#001010] capitalize">
                        {user.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* User event count */}
              <div className="flex py-3 justify-center border rounded-[16px] border-[#F0F0F0]">
                <div className="text-center flex-1 flex flex-col">
                  <span className="paytone text-[#001010] text-base">
                    {isUserEventsCountLoading ? (
                      <div className="h-4 w-8 bg-gray-300 animate-pulse rounded mx-auto"></div>
                    ) : (
                      userEventsCount?.created || 0
                    )}
                  </span>
                  <span className="text-[12px] leading-[18px] font-bold text-[#8A9191]">
                    Hosted
                  </span>
                </div>
                <div className="min-h-full w-[1px] bg-[#F0F0F0]"></div>
                <div className="text-center flex-1 flex flex-col">
                  <span className="paytone text-[#001010] text-base">
                    {isUserEventsCountLoading ? (
                      <div className="h-4 w-8 bg-gray-300 animate-pulse rounded mx-auto"></div>
                    ) : (
                      userEventsCount?.attended || 0
                    )}
                  </span>
                  <span className="text-[12px] leading-[18px] font-bold text-[#8A9191]">
                    Attended
                  </span>
                </div>
              </div>
              {/* User social media links */}
              {user.socials && (
                <div className="flex items-center gap-3">
                  {user.socials.instagram && (
                    <Link to={user.socials.instagram} target="_blank">
                      <InstagramIcon size={22} />
                    </Link>
                  )}
                  {user.socials.twitter && (
                    <Link to={user.socials.twitter} target="_blank">
                      <FaXTwitter size={22} color="#001010" />
                    </Link>
                  )}
                  {user.socials.facebook && (
                    <Link to={user.socials.facebook} target="_blank">
                      <FaFacebook size={22} color="#0866FF" />
                    </Link>
                  )}
                  {user.socials.linkedin && (
                    <Link to={user.socials.linkedin} target="_blank">
                      <FaLinkedin size={22} color="#0A66C2" />
                    </Link>
                  )}
                </div>
              )}
            </div>
            {/* My events */}
            <div className="flex-1">
              <div className="flex justify-between flex-col min-[500px]:flex-row gap-4 items-center mb-6">
                <h1 className="paytone capitalize text-[#077D8A] leading-[22px] text-[30px] font-[400]">
                  Past Events
                </h1>
                {/* Filter tabs */}
                <div className="border border-[#F9F9F9] p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
                  <TagButton
                    text="All"
                    size="xs"
                    className={twMerge(
                      "satoshi min-w-auto px-2",
                      filter === "all"
                        ? "hover:bg-white bg-white text-[#011F0F]"
                        : "bg-transparent text-[#B0B5B5] border-transparent"
                    )}
                    onClick={() => setFilter("all")}
                  />
                  <TagButton
                    text="Hosted"
                    size="xs"
                    className={twMerge(
                      "satoshi min-w-auto px-2",
                      filter === "hosted"
                        ? "hover:bg-white bg-white text-[#011F0F]"
                        : "bg-transparent text-[#B0B5B5] border-transparent"
                    )}
                    onClick={() => setFilter("hosted")}
                  />
                  <TagButton
                    text="Attended"
                    size="xs"
                    className={twMerge(
                      "satoshi min-w-auto px-2",
                      filter === "attended"
                        ? "hover:bg-white bg-white text-[#011F0F]"
                        : "bg-transparent text-[#B0B5B5] border-transparent"
                    )}
                    onClick={() => setFilter("attended")}
                  />
                </div>
              </div>
              {/* Events list */}
              {loading ? (
                <EventItemsLoader count={3} showDate={false} />
              ) : error ? (
                <div>{error.message}</div>
              ) : (
                <React.Fragment>
                  {filteredEvents.length > 0 ? (
                    <div className="flex flex-col w-full gap-2">
                      {filteredEvents.map((event, index) => (
                        <Modal.Open
                          onOpen={() => setActiveEventId(event._id)}
                          key={index}
                          opens={"event-details-modal"}
                        >
                          <EventItem event={event} />
                        </Modal.Open>
                      ))}
                    </div>
                  ) : (
                    <NoEvents message="Looks like there's nothing happening right now. Why not be the first to create an event?" />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      {/* Render event modal */}
      {activeEventId && <EventDetailsModal eventId={activeEventId} />}
    </main>
  );
}

export default Profile;
