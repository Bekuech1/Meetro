import React, { useState, useEffect } from "react";
import ShareEvent from "./ShareEvent";
import DownloadEvent from "./DownloadEvent";
import {
  Attendance,
  EventCategories,
  ModalBtn,
  ModalText,
} from "../home/EventModal";
import SiteBtn from "../Layout-conponents/SiteBtn";
import API from "@/lib/axios";
import { useParams } from "react-router-dom";

const Eventdetails = () => {
  const { eventId } = useParams(); // Assuming you're using react-router for routing
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await API.get(`/events/${eventId}`);
        setEventData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleConfirmAttendance = async (responseType) => {
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

  if (loading) {
    return <div className="text-center py-10">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  //empty state
  if (!eventData) {
    return <div className="text-center py-10">Event not found</div>;
  }

  // const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const imagePath = eventData?.imageKey?.S
    ? new URL(eventData.imageKey.S, import.meta.env.VITE_IMAGE_URL).toString()
    : "/events-modal.png"; // or some placeholder

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-8">
      {/* Left Section - Event Image and Host Info */}
      <section className="w-full lg:w-[349px] h-full grid gap-8 relative overflow-y-auto scrollbar-hide">
        <div className="relative">
          <img
            src={imagePath}
            alt="Event-poster"
            className="rounded-3xl w-full lg:w-[393px] h-[318px] lg:h-[349px]"
          />
          <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
            <img src="/image.svg" className="z-10" alt="Image" />
          </div>
        </div>

        <section className="grid gap-4">
          <div className="gap-1 grid">
            <ModalText img="/crown.svg" text="hosts" />
            <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70 justify-center items-center">
              {eventData.creator?.M && (
                <>
                  <img
                    src="/tiny-profile.png"
                    alt="Host"
                    className="w-6 h-6 rounded-full border border-white"
                  />
                  <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                    {eventData.creator.M.name?.S || "Event Host"}
                  </h6>
                </>
              )}
            </div>
          </div>

          <div className="rounded-[12px] p-2 flex justify-between border-[2px] border-white items-center bg-white/70">
            <h6 className="text-[#8A9191] text-[13px] font-[500] leading-[24px] satoshi capitalize">
              {attendanceStatus === "yes"
                ? "You're attending this event"
                : "You have Manage access to this event"}
            </h6>
            <SiteBtn
              name="manage"
              colorPadding="py-2 px-3 bg-[#AEFC40]"
              onclick={() => console.log("Manage button clicked")}
            />
          </div>
        </section>
      </section>

      {/* Right Section - Event Details */}
      <section className="w-full lg:w-[569px] sm:h-full h-fit sm:overflow-y-auto scrollbar-hide grid gap-6">
        <div className="flex w-full h-fit gap-2">
          <div className="grid w-full h-fit gap-2 text-start">
            <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
              {eventData.title?.S || "Event"}
            </h1>
            <ModalText
              img="/timer.svg"
              text={`${eventData?.date?.S} - ${eventData?.timeFrom?.S}`}
            />
            <div className="w-full min-w-[100px] h-fit flex gap-2">
              {eventData.categories?.L?.map((category, index) => (
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
          <div className="hidden md:flex flex-row gap-2">
            <ShareEvent eventId={eventId} />
            <DownloadEvent />
          </div>
        </div>

        <div className="w-full h-fit grid gap-2">
          <ModalText img="/note-text.svg" text="about event" />

          <h4
            className={`${
              isExpanded ? "" : "line-clamp-3"
            } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}>
            {eventData.description?.S ||
              "No description available for this event."}
          </h4>

          {/* ✅ Show the toggle button only if description is long */}
          {eventData.description?.S && eventData.description.S.length > 150 && (
            <button
              onClick={toggleReadMore}
              className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit">
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Attendance Confirmation Section */}
        <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
          <div className="w-full h-fit flex justify-between">
            <div className="w-full h-fit grid gap-1 satoshi">
              <h5 className="text-[16px] font-[700] leading-[24px] text-black">
                {attendanceStatus === "yes"
                  ? "✅ You're going!"
                  : "Not confirmed yet"}
              </h5>
              <p className="text-[14px] font-[500] leading-[20px] text-[#8A9191]">
                {attendanceStatus === "yes"
                  ? "We'll send you reminders and updates so you don't miss a thing."
                  : "Confirm your attendance to get updates."}
              </p>
            </div>
            {eventData.date?.S && (
              <div className="h-fit w-fit min-w-[100px] rounded-[20px] p-2 bg-[#866AD2]/10 satoshi text-[10px] font-[500] leading-[14px]">
                Starting in{" "}
                <span className="text-[#866AD2]">
                  {calculateTimeRemaining(eventData.date.S)}
                </span>
              </div>
            )}
          </div>
          <div className="satoshi w-full h-fit flex justify-between items-center">
            <h5 className="text-[14px] font-[700] leading-[20px] text-black flex">
              {attendanceStatus === "yes"
                ? "Invite a friend too 👉"
                : "Confirm your attendance"}
            </h5>
            {attendanceStatus === "yes" ? (
              <>
                <ModalBtn
                  onClick={() => handleConfirmAttendance("no")}
                  bgcolor="bg-[#E6F2F3]"
                  image="/send.svg"
                  textcolor="text-black"
                  text="Invite a Friend"
                />
                <ModalBtn
                  onClick={() => handleConfirmAttendance("yes")}
                  bgcolor="bg-[#011F0F]"
                  image="/tick-circle-green.svg"
                  textcolor="text-[#61B42D]"
                  text="Change to Going"
                />
              </>
            ) : (
              <>
                <Attendance
                  text="Not sure"
                  bgHover="#011F0F"
                  img="/timer-modal.svg"
                  textcolor="#7A60BF"
                  onClick={() => handleConfirmAttendance("maybe")}
                />
                <Attendance
                  text="Going"
                  bgHover="#011F0F"
                  img="/tick-circle-green.svg"
                  textcolor="#61B42D"
                  onClick={() => handleConfirmAttendance("yes")}
                />
              </>
            )}
          </div>
        </div>

        {/* Dress Code Section */}
        <div className="grid gap-2 w-full h-fit">
          <ModalText img="/dress.svg" text="dress code" />
          <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
            {eventData.dressCode?.S || "Not specified"}
          </h6>
        </div>

        {/* Location Section */}
        <div className="grid gap-2 w-full h-fit">
          <ModalText img="/modal-location.svg" text="location" />
          <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
            {eventData.location?.M?.venue?.S || "Location not specified"}
          </h6>
          <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
            {eventData.location?.M?.state?.S},{" "}
            {eventData.location?.M?.country?.S}
          </p>
        </div>

        {/* Attendees Section */}
        {eventData.attendees?.L && eventData.attendees.L.length > 0 && (
          <div className="grid gap-2 w-full h-fit">
            <ModalText
              img="/crown.svg"
              text={`going (${eventData.attendees.L.length})`}
            />
            <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
              {eventData.attendees.L.map((attendee, index) => (
                <div
                  key={index}
                  className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                  <img
                    src="/large-profile.jpg"
                    alt="Attendee"
                    className="size-[66px] rounded-full"
                  />
                  <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                    {attendee.M?.name?.S || "Attendee"}
                  </h6>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

// Helper function to calculate time remaining
function calculateTimeRemaining(eventDate) {
  const now = new Date();
  const eventTime = new Date(eventDate);
  const diff = eventTime - now;

  if (diff <= 0) return "Event has started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${days}d ${hours}h`;
}

export default Eventdetails;
