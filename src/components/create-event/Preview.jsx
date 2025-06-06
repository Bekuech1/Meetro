import React, { useState, useEffect } from "react";
import SiteBtn from "../Layout-conponents/SiteBtn";

const profiles = [
  { id: 1, image: "large-profile.jpg", name: "Chubby Igboanugo" },
  { id: 2, image: "large-profile.jpg", name: "Chubby Igboanugo" },
  { id: 3, image: "large-profile.jpg", name: "Chubby Igboanugo" },
  { id: 4, image: "large-profile.jpg", name: "Chubby Igboanugo" },
  { id: 5, image: "large-profile.jpg", name: "Chubby Igboanugo" },
];

const Preview = ({
  closeModal,
  eventImg,
  eventName,
  hostName,
  description,
  dressCode,
  state,
  location,
  locationType,
  amount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

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
      <div className="fixed inset-0 lg:h-screen h-full lg:flex lg:items-center lg:justify-center z-30 bg-[#F0F0F0] hidden ">
        <div className="flex flex-col gap-6 lg:w-fit w-full h-full pt-10">
          {/* Close Button */}
          <div className="w-full h-fit">
            <img
              src="arrow-left.svg"
              alt=""
              className="h-12 w-12 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <div className="w-fit h-fit flex gap-8 bg-[#F0F0F0] text-center scrollbar-hide overflow-y-auto pb-10">
            {/* Left Section */}
            <section className="w-fit h-fit grid gap-8 relative scrollbar-hide">
              <div className="relative">
                <img
                  src={eventImg}
                  alt="Event"
                  className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[333px] h-[306px] object-cover"
                />
                <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
                  <img src="image.svg" className="z-10" alt="" />
                </div>
              </div>
              <section className="grid gap-4">
                <div className="gap-1 grid">
                  {/* Modal Text Component */}
                  <ModalText img="crown.svg" text="hosts" />
                  <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70 justify-center items-center">
                    <img
                      src="tiny-profile.png"
                      alt=""
                      className="w-6 h-6 rounded-full border border-white"
                    />
                    <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                      {hostName || "..."}
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
            <section className="w-[567px] h-fit grid gap-6">
              <div className="flex w-full h-fit gap-2">
                <div className="grid w-full h-fit gap-2 text-start">
                  <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
                    {eventName || "..."}
                  </h1>
                  <ModalText img="timer.svg" text='heyyyy' />
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
                    <img src="send.svg" alt="" />
                  </div>
                  <div className="w-fit h-fit p-[10px] bg-white rounded-full cursor-pointer">
                    <img src="download.svg" alt="" />
                  </div>
                </div>
              </div>

              {description && (
                <div className="w-full h-fit grid gap-2">
                  {/* ModalText Component */}
                  <ModalText img="note-text.svg" text="about event" />

                  {/* H4 Element */}
                  <h4
                    className={`${
                      isExpanded ? "" : "line-clamp-3"
                    } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}
                  >
                    {description}
                  </h4>

                  {/* Read More Button */}
                  {description.length > 140 && (
                    <button
                      onClick={toggleReadMore}
                      className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              )}

              <div className="w-full h-fit grid gap-2">
                <ModalText img="money-add.svg" text="chip in" />

                <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                  <div className="h-fit w-full grid">
                    <p className="capitalize text-[#8A9191] font-[500] text-[14px] leading-[20px] satoshi ">
                      Target goal
                    </p>
                    <h6 className="capitalize text-black font-[700] text-[24px] leading-[32px] satoshi ">
                      ₦ {amount}
                    </h6>
                  </div>
                  <div className="w-full h-fit rounded-[10px] bg-[#518A00]/10">
                    <div className="h-2 w-[40%] rounded-[10px] bg-[#61B42D]"></div>
                    {/* Fixed */}
                  </div>
                  <div className="h-fit w-full flex justify-between">
                    <h6 className="satoshi font-[500] text-[16px] leading-[24px]">
                      ₦ {amount}
                    </h6>
                    <h6 className="satoshi font-[500] text-[16px] leading-[24px]">
                      ₦ {amount}
                    </h6>
                  </div>
                </div>
              </div>

              <section className="w-full h-fit flex gap-2">
                <Attendance
                  text="not sure"
                  img="timer-modal.svg"
                  textcolor="#7A60BF"
                  onclick={() => console.log("Attendance clicked")} // Fixed
                />
                <Attendance
                  text="not sure"
                  img="tick-circle-green.svg"
                  textcolor="#61B42D"
                />
              </section>

              <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                <div className="w-full h-fit flex justify-between">
                  <div className="w-full h-fit grid gap-1 satoshi">
                    <h5 className="text-[16px] font-[700] leading-[24px] text-black">
                      ✅ You’re going!
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
                <div className="satoshi w-full h-fit flex justify-between items-center">
                  <h5 className="text-[14px] font-[700] leading-[20px] text-black flex">
                    Invite a friend too 👉
                  </h5>
                  <ModalBtn
                    onClick=""
                    bgcolor="bg-[#E6F2F3]"
                    image="send.svg"
                    textcolor="text-black"
                    text="Invite a Friend"
                  />
                  <ModalBtn
                    onClick=""
                    bgcolor="bg-[#011F0F]"
                    image="tick-circle-green.svg"
                    textcolor="text-[#61B42D]"
                    text="Change to Going"
                  />
                </div>
              </div>

              {dressCode && (
                <div className="grid gap-2 w-full h-fit">
                  <ModalText img="dress.svg" text="dress code" />
                  <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                    {dressCode}
                  </h6>
                </div>
              )}
              {location && (
                <div className="grid gap-2 w-full h-fit">
                  <ModalText img="modal-location.svg" text="location" />
                  <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                    CCHub
                  </h6>
                  {location && (
                    <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
                      {location}
                      Nigeria
                    </p>
                  )}
                  {online && <a href={online}>{online}</a>}
                </div>
              )}

              {/* have to map attendees */}
              {profiles.length > 0 && (
                <div className="grid gap-2 w-full h-fit">
                  <ModalText
                    img="crown.svg"
                    text={profiles.length + " people are going"}
                  />
                  <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
                    {profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70"
                      >
                        <img
                          src={profile.image}
                          alt=""
                          className="size-[66px] rounded-full"
                        />
                        <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                          {profile.name}
                        </h6>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* mobile modal */}
      <div className="fixed inset-0 h-full z-30 bg-transparent flex lg:hidden">
        <div className="w-full h-[calc(100vh-64px)] absolute left-0 top-[64px] px-4 pt-4 pb-12 bg-[#E8E8E8] z-40 grid gap-4 lg:hidden overflow-y-auto scrollbar-hide">
          <div className="w-full h-fit flex justify-between items-center">
            <img
              src="arrow-left.svg"
              className="size-8 cursor-pointer"
              onClick={closeModal}
            />
            <div className="size-fit p-[6px] rounded-full bg-white flex justify-center items-center cursor-pointer">
              <img src="send.svg" className="size-4" />
            </div>
          </div>

          <div className="w-full h-fit grid gap-4 items-center justify-center">
            <section className="w-full h-fit gap-[6px]">
              <h1 className="paytone capitalize text-black font-[400] text-[20px]">
                {eventName || "..."}
              </h1>
              <div className="flex gap-[6px]">
                <ModalText
                  img="modal-location.svg"
                  text="5 Mabushi way, Abuja."
                />
                <ModalText img="timer.svg" text="6:30pm" />
              </div>
            </section>
            <img
              src={eventImg}
              alt="Event"
              className="rounded-3xl min-w-[300px] min-h-[300px] sm:size-[350px] mx-auto"
            />
            <section className="grid gap-4">
              <div className="gap-1 grid">
                {/* Modal Text Component */}
                <ModalText img="crown.svg" text="hosts" />
                <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70">
                  <img
                    src="tiny-profile.png"
                    alt=""
                    className="w-6 h-6 rounded-full border border-white"
                  />
                  <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                    {hostName || "..."}
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
            {description && (
              <section className="mt-4 grid gap-2 w-full h-fit fix">
                {/* ModalText Component */}
                <ModalText img="note-text.svg" text="about event" />

                {/* H4 Element */}

                <h4
                  className={`${
                    isExpanded ? "" : "line-clamp-3"
                  } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}
                >
                  {description}
                </h4>

                {/* Read More Button */}
                {description.length > 140 && (
                  <button
                    onClick={toggleReadMore}
                    className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </section>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full mx-auto">
            <div className="w-full h-fit grid gap-2">
              <ModalText img="money-add.svg" text="chip in" />

              <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                <div className="h-fit w-full grid">
                  <p className="capitalize text-[#8A9191] font-[500] text-[14px] satoshi ">
                    Target goal
                  </p>
                  <h6 className="capitalize text-black font-[700] text-[24px] satoshi ">
                    ₦ {amount}
                  </h6>
                </div>
                <div className="w-full h-fit rounded-[10px] bg-[#518A00]/10">
                  <div className="h-2 w-[10%] rounded-[10px] bg-[#61B42D]"></div>
                  {/* Fixed */}
                </div>
                <div className="h-fit w-full flex justify-between">
                  <h6 className="satoshi font-[500] text-[16px]">₦ {amount}</h6>
                  <h6 className="satoshi font-[500] text-[16px]">₦ {amount}</h6>
                </div>
              </div>
            </div>
            <section className="w-full h-fit flex gap-2">
              <Attendance
                text="not sure"
                img="timer-modal.svg"
                textcolor="#7A60BF"
                onclick={() => console.log("Attendance clicked")} // Fixed
              />
              <Attendance
                text="not sure"
                img="tick-circle-green.svg"
                textcolor="#61B42D"
              />
            </section>

            <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
              <div className="w-full h-fit flex justify-between">
                <div className="w-full h-fit grid gap-1 satoshi">
                  <h5 className="text-[16px] font-[700] leading-[24px] text-black">
                    ✅ You’re going!
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
                    image="send.svg"
                    textcolor="text-black"
                    text="Invite a Friend"
                  />
                  <ModalBtn
                    onClick=""
                    bgcolor="bg-[#011F0F]"
                    image="tick-circle-green.svg"
                    textcolor="text-[#61B42D]"
                    text="Change to Going"
                  />
                </div>
              </div>
            </div>

            {dressCode && (
              <div className="grid gap-2 w-full h-fit">
                <ModalText img="dress.svg" text="dress code" />
                <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                  {dressCode}
                </h6>
              </div>
            )}
            {location && (
              <div className="grid gap-2 w-full h-fit">
                <ModalText img="modal-location.svg" text="location" />
                <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                  CCHub
                </h6>
                {offline && (
                  <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
                    {location}, {locationType},
                  </p>
                )}
              </div>
            )}

            {/* have to map attendees */}
            {profiles.length > 0 && (
              <div className="grid gap-2 w-full h-fit">
                <ModalText
                  img="crown.svg"
                  text={profiles.length + " people are going"}
                />
                <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70"
                    >
                      <img
                        src={profile.image}
                        alt=""
                        className="size-[66px] rounded-full"
                      />
                      <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                        {profile.name}
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;

// ModalText Component
const ModalText = ({ img, text }) => {
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
const EventCategories = ({ borderBgColor, text }) => {
  return (
    <div
      className={`font-[500] text-[12px] leading-[18px] bg-white capitalize border-[0.5px] p-[8px] rounded-[20px] ${borderBgColor}`} // Fixed
    >
      {text}
    </div>
  );
};

const ModalBtn = ({ onClick, bgcolor, image, textcolor, text }) => {
  return (
    <div
      className={`lg:w-fit w-full h-fit rounded-[60px] flex gap-2 p-[10px] justify-center items-center cursor-pointer ${bgcolor}`}
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

const Attendance = ({ img, text, textcolor, onclick }) => {
  return (
    <div
      className="cursor-pointer w-full h-fit rounded-[60px] lg:py-3 lg:px-8 lg:gap-2 py-2 px-3 gap-1 bg-white flex flex-col paytone items-center justify-center"
      onClick={onclick}
    >
      <img src={img} alt="" className="size-8" />
      <h6
        className={`text-[${textcolor}] font-[400] text-[12px] lg:leading-[18px] capitalize`}
      >
        {text}
      </h6>
    </div>
  );
};
