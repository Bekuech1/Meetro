import useEventStore from "@/stores/eventStore";
import API from "@/lib/axios";
import SiteBtn from "../Layout-conponents/SiteBtn";
import ShareEvent from "./ShareEvent";
import LoginModal from "../Onboarding/LoginModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventCategories, ModalBtn, ModalText } from "../home/EventModal";
import { LoadingSpinner } from "../create-event/Private";
import {
  getProfilePicture,
  setAttendeeImage,
} from "../Profile/PersonalProfile";
import { AttendBtn } from "./AttendBtn";
import { calculateTimeRemaining } from "@/lib/utils";

export default function EventInfo({ eventId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingResponseType, setPendingResponseType] = useState(null);
  const user = useAuthStore(state => state.user);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const navigate = useNavigate();
  const [loadingResponseType, setLoadingResponseType] = useState(null);
  const profilePic = getProfilePicture();
  const attendeeImage = setAttendeeImage();

  // Get description text
  const description =
    eventDetails?.description?.S || "No description available for this event.";

  // Shortened text
  const shortText = description.slice(0, 150);

  // Attendees
  const attendees = eventDetails?.attendees.L.filter(
    attendee => attendee.M.responseType.S === "yes"
  );

  // Time remaining
  const timeRemaining = calculateTimeRemaining(eventDetails?.date.S);

  // Toggle function
  const toggleReadMore = () => setIsExpanded(s => !s);

  // Handles user confirming attendance
  const handleConfirmAttendance = async responseType => {
    // If no user is logged in, show the login modal and remember which response they tried
    if (!user || !user.userId) {
      setPendingResponseType(responseType);
      setShowLoginModal(true);
      return;
    }

    // Indicate which response type is currently loading (for UI feedback)
    setLoadingResponseType(responseType);

    try {
      // Attempt to confirm attendance
      await confirmAttendance(responseType);
    } catch (error) {
      // If something goes wrong, show a readable error message
      setError(error.response?.data?.error || "Failed to confirm attendance");
    } finally {
      // Stop loading indicator regardless of success or failure
      setLoadingResponseType(null);
    }
  };

  // Makes the actual API requests to confirm the user's attendance
  const confirmAttendance = async responseType => {
    try {
      // First, create a "share" entry for the event
      const shareResponse = await API.post(`/shares`, { eventId });

      // Extract the shareId from the response
      const shareId = shareResponse.data?.shareId;
      if (!shareId) throw new Error("shareId not returned");

      // Then confirm attendance for that specific share
      await API.post(`/shares/${shareId}/confirm`, { responseType });

      // Update the UI to reflect the new attendance status
      setAttendanceStatus(responseType);

      if (responseType === "yes") {
        setEventDetails(prev => {
          // Check if user already in attendees
          const existingIndex = prev.attendees.L.findIndex(
            attendee => attendee.M.userId.S === user.userId
          );

          // Add new attendee
          const newAttendee = {
            M: {
              userId: { S: user.userId },
              email: { S: user.email },
              name: { S: `${user.firstName} ${user.lastName}` },
              responseType: { S: "yes" },
              respondedAt: { S: new Date().toISOString() },
            },
          };

          let updatedAttendees;

          if (existingIndex !== -1) {
            // Replace existing attendee
            updatedAttendees = [...prev.attendees.L];
            updatedAttendees[existingIndex] = newAttendee;
          } else {
            // Add new attendee
            updatedAttendees = [...prev.attendees.L, newAttendee];
          }

          return {
            ...prev,
            attendees: {
              ...prev.attendees,
              L: updatedAttendees,
            },
          };
        });
      }
    } catch (err) {
      // Handle and display any errors from the API
      setError(err.response?.data?.error || "Failed to confirm attendance");
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await API.get(`/events/${eventId}`);
        const event = response.data;

        // Check if user is creator or if user has responded and set attendance status
        if (user && event) {
          console.log(user);
          if (user.userId === event.creator.M.id.S) setAttendanceStatus("yes");
          const eventAttendees = event.attendees.L;
          // Find the "yes" first
          let matchAttendee = eventAttendees.find(
            attendee =>
              attendee.M.userId.S === user.userId &&
              attendee.M.responseType.S === "yes"
          );
          // Set attendance status
          if (matchAttendee) {
            setAttendanceStatus("yes");
          } else {
            // If no "yes" found, fall back to "maybe"
            matchAttendee = eventAttendees.find(
              attendee =>
                attendee.M.userId.S === user.userId &&
                attendee.M.responseType.S === "maybe"
            );
            if (matchAttendee) setAttendanceStatus("maybe");
          }
        }
        console.log(event);
        setEventDetails(event);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Loading event
  if (loading) {
    return (
      <div className="text-center flex-1 py-10 w-full md:w-[950px] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="text-center py-10 w-full md:w-[950px] h-[calc(100vh-132px)] flex flex-col items-center justify-center gap-3">
        <p className="text-red-500 text-center py-10 satoshi">{error}</p>
      </div>
    );
  }

  // Empty state
  if (!eventDetails) {
    return (
      <div className="text-center py-10 w-full md:w-[950px] h-[calc(100vh-132px)] flex flex-col items-center justify-center gap-3">
        <p className="text-center py-10 satoshi">Event not found</p>
      </div>
    );
  }

  // Event image URL
  const imagePath = eventDetails?.imageKey?.S
    ? new URL(
        eventDetails.imageKey.S,
        import.meta.env.VITE_IMAGE_URL
      ).toString()
    : "/event-ph1.png"; // or some placeholder

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-8 w-full lg:w-[950px] mx-auto">
      {/* Left Section - Event Image and Host Info */}
      <section className="w-full lg:w-[349px] h-full grid gap-8 relative">
        <div>
          <img
            src={imagePath}
            alt="Event-poster"
            className="rounded-3xl size-[306px] lg:w-[343px] lg:h-[323px] mx-auto"
          />
        </div>

        <section className="grid gap-4">
          <div className="gap-1 grid">
            <ModalText img="/crown.svg" text="hosts" />
            {(eventDetails.creator?.M || eventDetails.hostName?.S) && (
              <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70 justify-center items-center">
                <img
                  src={profilePic}
                  alt="Host"
                  className="w-6 h-6 rounded-full border border-white"
                />
                <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                  {eventDetails.hostName?.S || eventDetails.creator.M.name?.S}
                </h6>
              </div>
            )}
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
                  onclick={() => navigate(`/manage-event/${eventId}`)}
                />
              </div>
            )}
          </div>
        </section>
      </section>

      {/* Right Section - Event Details */}
      <section className="w-full md:w-[569px] md:h-full h-fit md:overflow-y-auto scrollbar-hide flex flex-col gap-6">
        <div className="flex w-full h-fit gap-2">
          <div className="grid w-full h-fit gap-2 text-start">
            <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
              {eventDetails.title?.S}
            </h1>
            <ModalText
              img="/timer.svg"
              text={`${eventDetails?.date?.S} - ${eventDetails?.timeFrom?.S}`}
            />
            {/* Event categories */}
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
          {/* Share event */}
          <div className="hidden md:flex">
            <ShareEvent eventId={eventId} className={`bg-white`} />
          </div>
        </div>

        {/* Event description */}
        {description && (
          <div className="w-full h-fit grid gap-2">
            <ModalText img="/note-text.svg" text="about event" />
            <h4 className="text-[#011F0F] font-[500] text-[16px] break-all whitespace-normal leading-[24px] text-left satoshi transition-all duration-300 ease-in-out">
              {isExpanded ? description : shortText}
              {!isExpanded && description.length > 150 ? "..." : ""}
            </h4>

            {/* Show the toggle button only if description is long */}
            {description.length > 150 && (
              <button
                onClick={toggleReadMore}
                className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        {/* Chip in */}
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
              <p className="capitalize text-[#8A9191] font-[500] text-[14px] satoshi">
                {eventDetails?.chipInType?.S || "Free event"}
              </p>
            </div>
          )}
        </div>

        {/* Attendance confirmation section */}
        <div>
          {!attendanceStatus && (
            <div className="flex gap-4 items-center">
              <AttendBtn
                type="maybe"
                loading={loadingResponseType === "maybe"}
                onClick={() => handleConfirmAttendance("maybe")}
              />
              <AttendBtn
                type="yes"
                loading={loadingResponseType === "yes"}
                onClick={() =>
                  handleConfirmAttendance("yes") &&
                  useEventStore.getState().setShouldRefetch(true)
                }
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
                        <span className="text-[#866AD2]">
                          {new Date(eventDetails.date.S) > new Date() && (
                            <span className="text-black">Starting in </span>
                          )}
                          {timeRemaining}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <h5 className="text-[14px] font-[700] leading-[20px] text-black">
                      Invite a friend too 👉
                    </h5>
                    <ShareEvent
                      eventId={eventId}
                      text={"Invite a friend"}
                      className={"bg-[#E6F2F3] paytone"}
                    />
                  </div>
                </div>
              )}
              {attendanceStatus === "maybe" && (
                <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                  <h5 className="text-[16px] font-[700] leading-[24px] text-[#001010]">
                    👀 Got it you're thinking about it!
                  </h5>
                  <p className="text-[14px] font-[500] leading-[20px] text-[#8A9191]">
                    We'll remind you as the date gets closer, just in case you
                    decide to come.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-full">
                      <ShareEvent
                        eventId={eventId}
                        text={"Invite a friend"}
                        className={`bg-[#E6F2F3] w-full text-center paytone`}
                      />
                    </div>

                    <ModalBtn
                      onClick={() =>
                        handleConfirmAttendance("yes") &&
                        useEventStore.getState().setShouldRefetch(true)
                      }
                      bgcolor="bg-white"
                      image="/tick-circle.svg"
                      textcolor="text-[#61B42D]"
                      text="Change to Going"
                    />
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
        {attendees && attendees.length > 0 && (
          <div className="grid gap-2 w-full h-fit">
            <ModalText img="/crown.svg" text={`going (${attendees.length})`} />
            <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
              {attendees.map((attendee, index) => (
                <div
                  key={index}
                  className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-[#FFFFFE80]"
                >
                  <img
                    src={attendeeImage}
                    alt="Attendee"
                    className="size-[66px] rounded-full"
                  />

                  <h6 className="h-fit w-full min-w-[120px] text-center capitalize satoshi font-[700] text-[12px] leading-[18px]">
                    {attendee.M?.name?.S}
                  </h6>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Toggle login modal */}
      {showLoginModal && (
        <LoginModal
          onSuccess={async () => {
            if (pendingResponseType) {
              await confirmAttendance(pendingResponseType);
              setPendingResponseType(null);
            }
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}
