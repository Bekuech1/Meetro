import API from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Attendance,
  EventCategories,
  ModalBtn,
  ModalText,
} from "../home/EventModal";
import SiteBtn from "../Layout-conponents/SiteBtn";
import ShareEvent from "./ShareEvent";
import LoginModal from "../Onboarding/LoginModal";
import { LoadingSpinner } from "../create-event/Private";
import { getProfilePicture } from "../Profile/PersonalProfile";

export default function EventInfo({ eventId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingResponseType, setPendingResponseType] = useState(null);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [loadingResponseType, setLoadingResponseType] = useState(null);
  const profilePic = getProfilePicture();

  // const {eventId} = useParams()

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleConfirmAttendance = async (responseType) => {
    if (!user || !user.userId) {
      setPendingResponseType(responseType);
      setShowLoginModal(true);
      return;
    }

    setLoadingResponseType(responseType);
    try {
      await confirmAttendance(responseType);
    } catch (error) {
      // console.error("Confirm attendance error:", error.response?.data || error);
      setError(error.response?.data?.error || "Failed to confirm attendance");
    } finally {
      setLoadingResponseType(null);
    }
  };

  const confirmAttendance = async (responseType) => {
    try {
      console.log("Confirming attendance for:", eventId);
      const shareResponse = await API.post(`/shares`, { eventId });
      console.log("Share created:", shareResponse.data);

      const shareId = shareResponse.data?.shareId;
      if (!shareId) throw new Error("shareId not returned");

      await API.post(`/shares/${shareId}/confirm`, { responseType });

      setAttendanceStatus(responseType);
    } catch (err) {
      console.error("Confirm attendance error:", err.response?.data || err);
      setError(err.response?.data?.error || "Failed to confirm attendance");
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await API.get(`/events/${eventId}`);
        const event = response.data;

        // check if current user is already attending event
        const attendees = event.attendees?.L || [];
        const matchedAttendee = attendees.find(
          (attendee) => attendee.M?.userId.S === user.userId
        );

        if (matchedAttendee) {
          // set status directly based on responseType
          setAttendanceStatus(matchedAttendee.M?.responseType.S || null);
        }

        setEventDetails(event);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <div className="text-center py-10 w-full md:w-[950px] h-full flex flex-col items-center justify-center gap-3">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#866AD2]"></div> */}
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  //empty state
  if (!eventDetails) {
    return <div className="text-center py-10">Event not found</div>;
  }

  // const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const imagePath = eventDetails?.imageKey?.S
    ? new URL(
        eventDetails.imageKey.S,
        import.meta.env.VITE_IMAGE_URL
      ).toString()
    : "/events-modal.png"; // or some placeholder

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-[950px] mx-auto">
      {/* Left Section - Event Image and Host Info */}
      <section className="w-full lg:w-[349px] h-full grid gap-8 relative overflow-y-auto scrollbar-hide">
        <div className="relative">
          <img
            src={imagePath}
            // src={eventDetails?.imageKey?.S}
            alt="Event-poster"
            className="rounded-3xl w-full lg:w-[343px] h-[318px] lg:h-[323px]"
          />
          {/* <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
            <img src="/image.svg" className="z-10" alt="Image" />
          </div> */}
        </div>

        <section className="grid gap-4">
          <div className="gap-1 grid">
            <ModalText img="/crown.svg" text="hosts" />
            <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70 justify-center items-center">
              {eventDetails.creator?.M && (
                <>
                  <img
                    // src="/tiny-profile.png"
                    src={profilePic}
                    alt="Host"
                    className="w-6 h-6 rounded-full border border-white"
                  />
                  <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                    {eventDetails.creator.M.name?.S || "Event Host"}
                  </h6>
                </>
              )}
            </div>
          </div>

          <div>
            {user?.userId === eventDetails.creator?.M?.id?.S && (
              <div className="rounded-[12px] p-2 flex justify-between border-[2px] border-white items-center bg-white/70">
                <h6 className="text-[#8A9191] text-[13px] font-[500] leading-[24px] satoshi capitalize">
                  You have Manage access to this event
                </h6>
                <SiteBtn
                  name="manage"
                  colorPadding="py-2 px-3 bg-[#AEFC40]"
                  onclick={() => navigate("/manage-event/" + eventId)}
                />
              </div>
            )}
          </div>
        </section>
      </section>

      {/* Right Section - Event Details */}
      <section className="w-full lg:w-[569px] sm:h-full h-fit sm:overflow-y-auto scrollbar-hide flex flex-col gap-6">
        <div className="flex w-full h-fit gap-2">
          <div className="grid w-full h-fit gap-2 text-start">
            <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
              {eventDetails.title?.S}
            </h1>
            <ModalText
              img="/timer.svg"
              text={`${eventDetails?.date?.S} - ${eventDetails?.timeFrom?.S}`}
            />
            <div className="w-full min-w-[100px] h-fit flex gap-2">
              {eventDetails.categories?.L?.map((category, index) => (
                <EventCategories
                  key={index}
                  borderBgColor={
                    index % 2 === 0
                      ? "text-[#9B1C46] border-[#9B1C46]"
                      : "text-[#0A84FF] border-[#0A84FF]"
                  }
                  text={category.S || "Category"}
                />
              ))}
            </div>
          </div>
          <div className="hidden md:flex">
            {/* <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full"> */}
            <ShareEvent eventId={eventId} className={`bg-white`} />
            {/* </div> */}

            {/* <DownloadEvent /> */}
          </div>
        </div>

        {eventDetails.description?.S && (
          <div className="w-full h-fit grid gap-2">
            <ModalText img="/note-text.svg" text="about event" />

            <h4
              className={`${
                isExpanded ? "" : "line-clamp-3"
              } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}
            >
              {eventDetails.description?.S ||
                "No description available for this event."}
            </h4>

            {/* ✅ Show the toggle button only if description is long */}
            {eventDetails.description?.S &&
              eventDetails.description.S.length > 150 && (
                <button
                  onClick={toggleReadMore}
                  className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
          </div>
        )}

        {/* chip in */}
        <div className="flex flex-col gap-2">
          <ModalText img="/money-add.svg" text="chip in" />

          {eventDetails?.chipInType?.S === "FIXED" ? (
            <div className="rounded-[12px] p-4 border-[2px] border-white text-left bg-white/70">
              <p className="text-[#8A9191]">{eventDetails?.chipInType?.S}</p>

              <div className="flex justify-between items-center">
                <p className="capitalize text-black font-[700] text-[24px] leading-[32px] satoshi ">
                  ₦{eventDetails?.chipInAmount?.S}
                </p>
                <p className="bg-[#D9D1F1] text-sm font-bold text-[#7A60BF] py-1 px-2 rounded-full">
                  Required to join the fun
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
              <p className="capitalize text-[#8A9191] font-[500] text-[14px] satoshi ">
                {eventDetails?.chipInType?.S || "Free event"}
              </p>
            </div>
          )}
        </div>

        {/* attendance confirmation section */}
        <div>
          {!attendanceStatus && (
            <div className="flex gap-4 items-center">
              <Attendance
                text="Not sure"
                bgHover="#011F0F"
                img="/timer-modal.svg"
                textcolor="#7A60BF"
                texthover="#C7BAEA"
                loading={loadingResponseType === "maybe"}
                onClick={() => handleConfirmAttendance("maybe")}
              />
              <Attendance
                text="Going"
                bgHover="#011F0F"
                img="/tick-circle-green.svg"
                textcolor="#61B42D"
                texthover="#BEFD66"
                loading={loadingResponseType === "yes"}
                onClick={() => handleConfirmAttendance("yes")}
              />
            </div>
          )}

          <div className="w-full h-fit flex justify-between">
            <div className="w-full h-fit grid gap-1 satoshi">
              {attendanceStatus === "yes" && (
                <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="text-[16px] font-[700] leading-[24px] text-black">
                        ✅ You're going!
                      </h5>
                      <p className="text-[14px] font-[500] leading-[20px] text-[#8A9191]">
                        We'll send you reminders and updates so you don't miss a
                        thing.
                      </p>
                    </div>

                    {eventDetails.date?.S && (
                      <div className="h-fit w-fit min-w-[100px] rounded-[20px] p-2 bg-[#866AD2]/10 satoshi text-[10px] font-[500] leading-[14px]">
                        Starting in{" "}
                        <span className="text-[#866AD2]">
                          {calculateTimeRemaining(eventDetails.date.S)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <h5 className="text-[14px] font-[700] leading-[20px] text-black">
                      Invite a friend too 👉
                    </h5>
                    {/* <ModalBtn
                      onClick={() => console.log("Invite a friend")}
                      bgcolor="bg-[#E6F2F3]"
                      image="/send.svg"
                      textcolor="text-black"
                      text="Invite a Friend"
                    /> */}
                    {/* <div className="w-fit rounded-[60px] bg-[#E6F2F3] flex items-center justify-center p-2.5 gap-2"> */}
                    <ShareEvent
                      eventId={eventId}
                      text={"Invite a friend"}
                      className={"bg-[#E6F2F3] paytone"}
                    />
                    {/* <p className="text-sm font-bold">Invite a Friend</p> */}
                    {/* </div> */}
                  </div>
                </div>
              )}

              {attendanceStatus === "maybe" && (
                <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                  <>
                    <h5 className="text-[16px] font-[700] leading-[24px] text-[#001010]">
                      👀 Got it you're thinking about it!
                    </h5>
                    <p className="text-[14px] font-[500] leading-[20px] text-[#8A9191]">
                      We'll remind you as the date gets closer, just in case you
                      decide to come.
                    </p>
                  </>
                  <div className="flex items-center gap-4">
                    <div className="w-full">
                      <ShareEvent
                        eventId={eventId}
                        text={"Invite a friend"}
                        className={`bg-[#E6F2F3] w-full text-center paytone`}
                      />
                      {/* <p className="paytone">Invite a Friend</p> */}

                      {/* <ModalBtn
                        // onClick={() => console.log("Invite a friend")}
                        bgcolor="bg-[#E6F2F3]"
                        image="/send.svg"
                        textcolor="text-black"
                        text="Invite a Friend"
                        className="w-full"
                      /> */}
                    </div>

                    <div className="bg-white rounded-[60px] w-full flex items-center justify-center border border-[#E5E7E3]">
                      <ModalBtn
                        onClick={() => handleConfirmAttendance("yes")}
                        // bgcolor="bg-white"
                        image="/tick-circle.svg"
                        textcolor="text-[#61B42D]"
                        text="Change to Going"
                        // className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dress Code Section */}
        {eventDetails.dressCode?.S && (
          <div className="grid gap-2 w-full h-fit">
            <ModalText img="/dress.svg" text="dress code" />
            <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
              {eventDetails.dressCode?.S || "Come in your best fit!"}
            </h6>
          </div>
        )}

        {/* Location Section */}
        <div className="grid gap-2 w-full h-fit">
          <ModalText img="/modal-location.svg" text="location" />
          <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
            {eventDetails.location?.M?.venue?.S || "Location not specified"}
          </h6>
          <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
            {eventDetails.location?.M?.state?.S},{" "}
            {eventDetails.location?.M?.country?.S}
          </p>
        </div>

        {/* Attendees Section */}
        {eventDetails.attendees?.L &&
          eventDetails.attendees?.L?.M?.responseType === "yes" &&
          eventDetails.attendees.L.length > 0 && (
            <div className="grid gap-2 w-full h-fit">
              <ModalText
                img="/crown.svg"
                text={`going (${eventDetails.attendees.L.length})`}
              />
              <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
                {eventDetails.attendees.L.map((attendee, index) => (
                  <div
                    key={index}
                    className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-[#FFFFFE80]"
                  >
                    <img
                      // src="/large-profile.jpg"
                      src={profilePic}
                      alt="Attendee"
                      className="size-[66px] rounded-full"
                    />

                    {/* <div className="size-[66px] rounded-full bg-[#077D8A] flex items-center justify-center">
                      <p className="text-sm font-[700] leading-[18px] text-white capitalize">
                        {getInitials(attendee.M?.name?.S)}
                      </p>
                    </div> */}

                    <h6 className="h-fit w-full min-w-[120px] text-center capitalize satoshi font-[700] text-[12px] leading-[18px]">
                      {attendee.M?.name?.S}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          )}
      </section>

      {showLoginModal && (
        <LoginModal
          onSuccess={async () => {
            setShowLoginModal(false);
            if (pendingResponseType) {
              await confirmAttendance(pendingResponseType);
              setPendingResponseType(null);
            }
          }}
        />
      )}
    </div>
  );
}

// Helper function to calculate time remaining
function calculateTimeRemaining(eventDate) {
  const now = new Date();
  const eventTime = new Date(eventDate);
  
  // Handle invalid date
  if (isNaN(eventTime)) return "Invalid date";
  
  const diff = eventTime - now;

  if (diff <= 0) return "Event has started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // More granular display logic
  if (days > 0) {
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  } else if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return "Starting soon";
  }
}

// Alternative version with more detailed formatting options
function calculateTimeRemainingDetailed(eventDate, options = {}) {
  const {
    showMinutes = false,
    shortFormat = true,
    includeSeconds = false
  } = options;

  const now = new Date();
  const eventTime = new Date(eventDate);
  
  if (isNaN(eventTime)) return "Invalid date";
  
  const diff = eventTime - now;

  if (diff <= 0) return "Event has started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const units = shortFormat 
    ? { d: 'days', h: 'hours', m: 'minutes', s: 'seconds' }
    : { d: 'd', h: 'h', m: 'm', s: 's' };

  let result = [];

  if (days > 0) result.push(`${days}${units.d}`);
  if (hours > 0) result.push(`${hours}${units.h}`);
  if (showMinutes && minutes > 0) result.push(`${minutes}${units.m}`);
  if (includeSeconds && seconds > 0) result.push(`${seconds}${units.s}`);

  return result.length > 0 ? result.join(' ') : "Starting soon";
}

// helper function to get attendees initials
// function getInitials(fullName) {
//   if (!fullName) return "";

//   const parts = fullName.trim().split(" ");
//   const firstInitial = parts[0]?.charAt(0).toUpperCase() || "";
//   const secondInitial = parts[1]?.charAt(0).toUpperCase() || "";

//   return `${firstInitial}${secondInitial}`;
// }
