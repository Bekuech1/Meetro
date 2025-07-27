import React, { useState, useEffect } from "react";
import SiteBtn from "../Layout-conponents/SiteBtn";
import API from "@/lib/axios";
import Eventdetails from "../event-dashboard/Eventdetails";

const EventModal = ({ eventId, closeModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (!eventId) return;

    API.get(`/events/${eventId}`).then((response) => {
      setEventDetails(response.data);
    });
  }, [eventId]);

  useEffect(() => {
    // Disable scrolling on the background
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 lg:h-screen h-full lg:flex lg:items-center lg:justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px] hidden ">
        <div className="flex flex-col-reverse gap-2 lg:w-fit w-full h-fit">
          <div className="lg:mx-14 mx-auto w-fit lg:h-[85vh] lg:max-h-[670px] h-full p-8 rounded-3xl lg:flex grid gap-8 bg-[#E8E8E8] text-center lg:overflow-hidden">
            {/* Left Section */}
            <section className="w-fit h-full grid gap-8 relative overflow-y-auto scrollbar-hide">
              <div className="relative">
                <img
                  src="/events-modal.png"
                  alt="Event"
                  className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[333px] h-[306px]"
                />
                <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
                  <img src="/image.svg" className="z-10" alt="" />
                </div>
              </div>
              <section className="grid gap-4">
                <div className="gap-1 grid">
                  {/* Modal Text Component */}
                  <ModalText img="/crown.svg" text="hosts" />
                  <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70 justify-center items-center">
                    <img
                      src="/tiny-profile.png"
                      alt=""
                      className="w-6 h-6 rounded-full border border-white"
                    />
                    <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                      {eventDetails?.creator?.M?.name?.S}
                    </h6>
                  </div>
                </div>
                <div className="rounded-[12px] p-2 flex justify-between border-[2px] border-white items-center bg-white/70">
                  <h6 className="text-[#8A9191] text-[13px] font-[500] leading-[24px] satoshi capitalize">
                    you have Manage access to this event
                  </h6>
                  <SiteBtn
                    name="manage"
                    colorPadding="py-2 px-3 bg-[#AEFC40]"
                    onclick={() => console.log("Manage button clicked")} // Fixed
                  />
                </div>
              </section>
            </section>

            {/* Right Section */}
            <section className="w-[567px] sm:h-full h-fit sm:overflow-y-auto scrollbar-hide grid gap-6">
              <div className="flex w-full h-fit gap-2">
                <div className="grid w-full h-fit gap-2 text-start">
                  <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
                    {eventDetails?.title?.S}
                  </h1>
                  <ModalText
                    img="timer.svg"
                    text={`${eventDetails?.date?.S}`}
                  />
                  <div className="w-full min-w-[100px] h-fit flex gap-2">
                    <EventCategories
                      borderBgColor="text-[#9B1C46] border-[#9B1C46]"
                      text="Food & Drink Events"
                    />
                    <EventCategories
                      borderBgColor="text-[#0A84FF] border-[#0A84FF]"
                      text="community meetups"
                    />
                  </div>
                </div>
                <div className="h-fit w-fit flex gap-4 justify-items-start">
                  <div className="w-fit h-fit p-[10px] bg-white rounded-full cursor-pointer">
                    <img src="/send.svg" alt="" />
                  </div>
                  {/* <div className="w-fit h-fit p-[10px] bg-white rounded-full cursor-pointer">
                    <img src="/download.svg" alt="" />
                  </div> */}
                </div>
              </div>

              <div className="w-full h-fit grid gap-2">
                {/* ModalText Component */}
                <ModalText img="/note-text.svg" text="about event" />

                {/* H4 Element */}
                <h4
                  className={`${
                    isExpanded ? "" : "line-clamp-3"
                  } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}
                >
                  {eventDetails?.description?.S ||
                    "No description for this event"}
                </h4>

                {/* Read More Button */}
                {eventDetails?.description?.S && (
                  <button
                    onClick={toggleReadMore}
                    className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>

              {/* chip in area */}
              <div className="w-full h-fit grid gap-2">
                <ModalText img="/money-add.svg" text="chip in" />

                {eventDetails?.chipInType?.S === "FIXED" ? (
                  <div className="rounded-[12px] p-4 border-[2px] border-white text-left bg-white/70">
                    <p className="text-[#8A9191]">
                      {eventDetails?.chipInType?.S}
                    </p>

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
                      {eventDetails?.chipInType?.S || "Not specified"}
                    </p>
                  </div>
                )}

                {/* <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                  <div className="h-fit w-full grid">
                    <p className="capitalize text-[#8A9191] font-[500] text-[14px] leading-[20px] satoshi ">
                      {eventDetails?.chipInType?.S}
                    </p>
                    <h6 className="capitalize text-black font-[700] text-[24px] leading-[32px] satoshi ">
                      ₦ {eventDetails?.chipInAmount?.S || "0"}
                    </h6>
                  </div>
                  <div className="w-full h-fit rounded-[10px] bg-[#518A00]/10">
                    <div className="h-2 w-[40%] rounded-[10px] bg-[#61B42D]"></div>{" "}
                    Fixed
                  </div>
                  <div className="h-fit w-full flex justify-between">
                    <h6 className="satoshi font-[500] text-[16px] leading-[24px]">
                      ₦ {eventDetails?.chipInAmount?.S}
                    </h6>
                    <h6 className="satoshi font-[500] text-[16px] leading-[24px]">
                      ₦ {eventDetails?.chipInAmount?.S || "0"}
                    </h6>
                  </div>
                </div> */}
              </div>

              <section className="w-full h-fit flex gap-2">
                <Attendance
                  text="Not sure"
                  img="/timer-modal.svg"
                  textcolor="#7A60BF"
                  bgHover="#011F0F"
                  onclick={() => console.log("Attendance clicked")} // Fixed
                />
                <Attendance
                  text="Going"
                  bgHover="#011F0F"
                  img="/tick-circle-green.svg"
                  textcolor="#61B42D"
                />
              </section>

              <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                <div className="w-full h-fit flex justify-between">
                  <div className="w-full h-fit grid gap-1 satoshi">
                    <h5 className="text-[16px] font-[700] leading-[24px] text-black">
                      ✅ You're going!
                    </h5>
                    <p className="text-[14px] font-[500] leading-[20px] text-[#8A9191]">
                      We'll send you reminders and updates so you don't miss a
                      thing.
                    </p>
                  </div>
                  <div className="h-fit w-fit min-w-[100px] rounded-[20px] p-2 bg-[#866AD2]/10 satoshi text-[10px] font-[500] leading-[14px]">
                    Starting in <span className="text-[#866AD2]">6d 8h</span>
                  </div>
                </div>
                <div className="satoshi w-full h-fit flex justify-between items-center">
                  <h5 className="text-[14px] font-[700] leading-[20px] text-black flex">
                    Invite a friend too 👉
                  </h5>
                  <ModalBtn
                    onClick=""
                    bgcolor="bg-[#E6F2F3]"
                    // bgHover="hover:bg-[#011F0F]"
                    image="/send.svg"
                    textcolor="text-black"
                    text="Invite a Friend"
                  />
                  <ModalBtn
                    onClick=""
                    bgcolor="bg-[#011F0F]"
                    image="/tick-circle-green.svg"
                    textcolor="text-[#61B42D]"
                    text="Change to Going"
                  />
                </div>
              </div>

              <div className="grid gap-2 w-full h-fit">
                <ModalText img="/dress.svg" text="dress code" />
                <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                  {eventDetails?.dressCode?.S || "Not specified"}
                </h6>
              </div>
              <div className="grid gap-2 w-full h-fit">
                <ModalText img="/modal-location.svg" text="location" />
                <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                  {eventDetails?.location?.M?.venue?.S}
                </h6>
                <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
                  {eventDetails?.location?.M?.state?.S},{" "}
                  {eventDetails?.location?.M?.country?.S}
                </p>
              </div>

              {/* have to map attendees */}
              <div className="grid gap-2 w-full h-fit">
                <ModalText img="/crown.svg" text="going (280)" />
                <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
                  <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                    <img
                      src="/large-profile.jpg"
                      alt=""
                      className="size-[66px] rounded-full"
                    />
                    <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                      Chubby Igboanugo
                    </h6>
                  </div>
                  <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                    <img
                      src="/large-profile.jpg"
                      alt=""
                      className="size-[66px] rounded-full"
                    />
                    <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                      Chubby Igboanugo
                    </h6>
                  </div>
                  <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                    <img
                      src="/large-profile.jpg"
                      alt=""
                      className="size-[66px] rounded-full"
                    />
                    <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                      Chubby Igboanugo
                    </h6>
                  </div>
                  <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                    <img
                      src="/large-profile.jpg"
                      alt=""
                      className="size-[66px] rounded-full"
                    />
                    <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                      Chubby Igboanugo
                    </h6>
                  </div>
                  <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                    <img
                      src="/large-profile.jpg"
                      alt=""
                      className="size-[66px] rounded-full"
                    />
                    <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                      Chubby Igboanugo
                    </h6>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Close Button */}
          <img
            src="/closePopup.svg"
            alt=""
            className="h-12 w-12 cursor-pointer ml-auto"
            onClick={closeModal}
          />
        </div>
      </div>

      {/* mobile modal */}
      <div className="fixed inset-0 h-full z-30 bg-transparent flex lg:hidden">
        <div className="w-full h-[calc(100vh-64px)] absolute left-0 top-[64px] px-4 pt-4 pb-12 bg-[#E8E8E8] z-40 grid gap-4 lg:hidden overflow-y-auto scrollbar-hide">
          <div className="w-full h-fit flex justify-between items-center">
            <img
              src="/arrow-left.svg"
              className="size-8 cursor-pointer"
              onClick={closeModal}
            />
            <div className="size-fit p-[6px] rounded-full bg-white flex justify-center items-center cursor-pointer">
              <img src="/send.svg" className="size-4" />
            </div>
          </div>

          <div className="w-full h-fit grid gap-4 items-center justify-center">
            <section className="w-full h-fit gap-[6px]">
              <h1 className="paytone capitalize text-black font-[400] text-[20px]">
                {eventDetails?.title?.S}
              </h1>
              <div className="flex gap-[6px]">
                <ModalText
                  img="/modal-location.svg"
                  text={`${eventDetails?.location?.M?.venue?.S}, ${eventDetails?.location?.M?.state?.S}`}
                />
                <ModalText img="/timer.svg" text={eventDetails?.timeFrom?.S} />
              </div>
            </section>
            <img
              src="/events-modal.png"
              alt="Event"
              className="rounded-3xl min-w-[333px] min-h-[306px] sm:size-[349px] mx-auto"
            />
            <section className="grid gap-4">
              <div className="gap-1 grid">
                {/* Modal Text Component */}
                <ModalText img="/crown.svg" text="hosts" />
                <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70">
                  <img
                    src="/tiny-profile.png"
                    alt=""
                    className="w-6 h-6 rounded-full border border-white"
                  />
                  <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                    {eventDetails?.creator?.M?.name?.S}
                  </h6>
                </div>
              </div>
              <div className="rounded-[12px] p-2 flex justify-between border-[2px] border-white items-center bg-white/70">
                <h6 className="text-[#8A9191] text-[12px] font-[500] satoshi capitalize">
                  you have Manage access to this event
                </h6>
                <SiteBtn
                  name="manage"
                  colorPadding="py-2 px-3 bg-[#AEFC40]"
                  onclick={() => console.log("Manage button clicked")} // Fixed
                />
              </div>
            </section>
            <section className="mt-4 grid gap-2 w-full h-fit">
              {/* ModalText Component */}
              <ModalText img="/note-text.svg" text="about event" />

              {/* H4 Element */}
              <h4
                className={`${
                  isExpanded ? "" : "line-clamp-3"
                } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}
              >
                {eventDetails?.description?.S ||
                  "No description for this event"}
              </h4>

              {/* Read More Button */}
              <button
                onClick={toggleReadMore}
                className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            </section>
          </div>

          <div className="w-full h-fit grid gap-2">
            <ModalText img="/money-add.svg" text="chip in" />

            <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
              <div className="h-fit w-full grid">
                <p className="capitalize text-[#8A9191] font-[500] text-[14px] satoshi ">
                  {eventDetails?.chipInType?.S || "Not specified"}
                </p>
                <h6 className="capitalize text-black font-[700] text-[24px] satoshi ">
                  ₦ {eventDetails?.chipInAmount?.S || "0"}
                </h6>
              </div>
              <div className="w-full h-fit rounded-[10px] bg-[#518A00]/10">
                <div className="h-2 w-[40%] rounded-[10px] bg-[#61B42D]"></div>{" "}
                {/* Fixed */}
              </div>
              <div className="h-fit w-full flex justify-between">
                <h6 className="satoshi font-[500] text-[16px]">₦ 1000</h6>
                <h6 className="satoshi font-[500] text-[16px]">
                  ₦ {eventDetails?.chipInAmount?.S || "0"}
                </h6>
              </div>
            </div>
          </div>
          <section className="w-full h-fit flex gap-2">
            <Attendance
              text="not sure"
              img="/timer-modal.svg"
              textcolor="#7A60BF"
              onclick={() => console.log("Attendance clicked")} // Fixed
            />
            <Attendance
              text="not sure"
              img="/tick-circle-green.svg"
              textcolor="#61B42D"
            />
          </section>

          <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
            <div className="w-full h-fit flex justify-between">
              <div className="w-full h-fit grid gap-1 satoshi">
                <h5 className="text-[16px] font-[700] leading-[24px] text-black">
                  ✅ You're going!
                </h5>
                <p className="text-[14px] font-[500] leading-[20px] text-[#8A9191]">
                  We'll send you reminders and updates so you don’t miss a
                  thing.
                </p>
              </div>
              <div className="h-fit w-fit min-w-[100px] rounded-[20px] p-2 bg-[#866AD2]/10 satoshi text-[10px] font-[500] leading-[14px]">
                Starting in <span className="text-[#866AD2]">6d 8h</span>
              </div>
            </div>
            <div className="satoshi w-full h-fit grid gap-[10px] items-center">
              <h5 className="text-[14px] font-[700] leading-[20px] text-black flex">
                Invite a friend too 👉
              </h5>
              <div className="w-full grid gap-4">
                <ModalBtn
                  onClick=""
                  bgcolor="bg-[#E6F2F3]"
                  image="/send.svg"
                  textcolor="text-black"
                  text="Invite a Friend"
                />
                <ModalBtn
                  onClick=""
                  bgcolor="bg-[#011F0F]"
                  image="/tick-circle-green.svg"
                  textcolor="text-[#61B42D]"
                  text="Change to Going"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2 w-full h-fit">
            <ModalText img="/dress.svg" text="dress code" />
            <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
              {eventDetails?.dressCode?.S || "Not specified"}
            </h6>
          </div>
          <div className="grid gap-2 w-full h-fit">
            <ModalText img="/modal-location.svg" text="location" />
            <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
              {eventDetails?.location?.M?.venue?.S || "Not specified"}
            </h6>
            <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
              {`${eventDetails?.location?.M?.state?.S || "Not specified"}, ${
                eventDetails?.location?.M?.country?.S || "Not specified"
              }`}
            </p>
          </div>

          {/* have to map attendees */}
          <div className="grid gap-2 w-full h-fit">
            <ModalText img="/crown.svg" text="going (280)" />
            <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
              <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                <img
                  src="/large-profile.jpg"
                  alt=""
                  className="size-[66px] rounded-full"
                />
                <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                  Chubby Igboanugo
                </h6>
              </div>
              <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                <img
                  src="/large-profile.jpg"
                  alt=""
                  className="size-[66px] rounded-full"
                />
                <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                  Chubby Igboanugo
                </h6>
              </div>
              <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                <img
                  src="/large-profile.jpg"
                  alt=""
                  className="size-[66px] rounded-full"
                />
                <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                  Chubby Igboanugo
                </h6>
              </div>
              <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                <img
                  src="/large-profile.jpg"
                  alt=""
                  className="size-[66px] rounded-full"
                />
                <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                  Chubby Igboanugo
                </h6>
              </div>
              <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
                <img
                  src="/large-profile.jpg"
                  alt=""
                  className="size-[66px] rounded-full"
                />
                <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                  Chubby Igboanugo
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventModal;

// ModalText Component
export const ModalText = ({ img, text }) => {
  return (
    <div className="flex gap-1 items-center w-fit h-fit">
      <img src={img} alt={text} className="w-4 h-4" />
      <h6 className="text-[#8A9191] text-[16px] font-[500] leading-[24px] satoshi capitalize">
        {text}
      </h6>
    </div>
  );
};

// event categories div
export const EventCategories = ({ borderBgColor, text }) => {
  return (
    <div
      className={`font-[500] text-[12px] leading-[18px] bg-white capitalize border-[0.5px] p-[8px] rounded-[20px] ${borderBgColor}`} // Fixed
    >
      {text}
    </div>
  );
};

export const ModalBtn = ({
  onClick,
  bgcolor,
  bgHover,
  image,
  textcolor,
  text,
}) => {
  return (
    <div
      className={`lg:w-fit w-full h-fit rounded-[60px] flex gap-2 p-[10px] justify-center items-center cursor-pointer ${bgHover} ${bgcolor}`}
      onClick={onClick}
    >
      <img src={image} className="size-[22px]" />
      <h6
        className={`paytone sm:font-[700] font-[500] sm:text-[14px] text-[10px] sm:leading-[20px] leading-[14px] ${textcolor}`}
      >
        {text}
      </h6>
    </div>
  );
};

export const Attendance = ({ img, text, bgHover, textcolor, texthover, onClick }) => {
  return (
    <div
      className={`cursor-pointer w-full h-fit rounded-[60px] lg:py-3 lg:px-8 lg:gap-2 py-2 px-3 gap-1 bg-white flex flex-col paytone items-center justify-center hover:bg-[${bgHover}] transition-all duration-1000 ease-in-out`}
      onClick={onClick}
    >
      <img src={img} alt="" className="size-8" />
      <h6
        className={`text-[${textcolor}] hover:text-[${texthover}] font-[400] text-[12px] lg:leading-[18px] capitalize`}
      >
        {text}
      </h6>
    </div>
  );
};
