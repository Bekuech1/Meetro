import React, { useState, useEffect } from "react";
import SiteBtn from "../Layout-conponents/SiteBtn";
import EventType from "./PopUps/EventType";

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
  eventTypes,
  time,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date(time).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown("Time's up!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // run immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleManageClick = () => {
    console.log("Manage button clicked");
  };

  const handleAttendanceClick = () => {
    console.log("Attendance clicked");
  };

  const handleInviteClick = () => {
    console.log("Invite friend clicked");
  };

  const handleChangeToGoingClick = () => {
    console.log("Change to going clicked");
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
      {/* Desktop Modal */}
      <div className="fixed inset-0 lg:h-screen h-full lg:flex lg:items-center lg:justify-center z-30 bg-[#F0F0F0] hidden">
        <div className="flex flex-col gap-6 lg:w-fit w-full h-full pt-10">
          {/* Close Button */}
          <div className="w-full h-fit">
            <img
              src="/arrow-left.svg"
              alt="Close modal"
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
                  <img src="/image.svg" className="z-10" alt="Image icon" />
                </div>
              </div>
              <section className="grid gap-4">
                <div className="gap-1 grid">
                  <ModalText img="/crown.svg" text="hosts" />
                  <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70 justify-center items-center">
                    <img
                      src="/tiny-profile.png"
                      alt="Host profile"
                      className="w-6 h-6 rounded-full border border-white"
                    />
                    <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                      {hostName}
                    </h6>
                  </div>
                </div>
              </section>
            </section>

            {/* Right Section */}
            <section className="w-[567px] h-fit grid gap-6">
              <div className="flex w-full h-fit gap-2">
                <div className="grid w-full h-fit gap-2 text-start">
                  <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
                    {eventName}
                  </h1>
                  <ModalText img="/timer.svg" text={time} />
                  <div>{eventTypes}</div>
                </div>
                <div className="h-fit w-fit flex gap-4 justify-items-start">
                  {/* <div className="w-fit h-fit p-[10px] bg-white rounded-full cursor-pointer">
                    <img src="/send.svg" alt="Send" />
                  </div> */}
                  {/* <div className="w-fit h-fit p-[10px] bg-white rounded-full cursor-pointer">
                    <img src="/download.svg" alt="Download" />
                  </div> */}
                </div>
              </div>

              {description && (
                <div className="w-full h-fit grid gap-2">
                  <ModalText img="/note-text.svg" text="about event" />
                  <h4
                    className={`${
                      isExpanded ? "" : "line-clamp-3"
                    } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}
                  >
                    {description}
                  </h4>
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

              {amount && (
                <div className="w-full h-fit grid gap-2">
                  <ModalText img="/money-add.svg" text="chip in" />
                  <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                    <div className="h-fit w-full grid">
                      <p className="capitalize text-[#8A9191] font-[500] text-[14px] leading-[20px] satoshi">
                        Target goal
                      </p>
                      <h6 className="capitalize text-black font-[700] text-[24px] leading-[32px] satoshi">
                        ₦ {amount}
                      </h6>
                    </div>
                    <div className="w-full h-fit rounded-[10px] bg-[#518A00]/10">
                      <div className="h-2 w-[40%] rounded-[10px] bg-[#61B42D]"></div>
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
              )}

              <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                <div className="w-full h-fit flex justify-between">
                  <div className="h-fit w-fit min-w-[100px] rounded-[20px] p-2 bg-[#866AD2]/10 satoshi text-[10px] font-[500] leading-[14px]">
                    Starting in <span className="text-[#866AD2]">{countdown}</span>
                  </div>
                </div>
              </div>

              {dressCode && (
                <div className="grid gap-2 w-full h-fit">
                  <ModalText img="/dress.svg" text="dress code" />
                  <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                    {dressCode}
                  </h6>
                </div>
              )}

              {location && (
                <div className="grid gap-2 w-full h-fit">
                  <ModalText img="/modal-location.svg" text="location" />
                  <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                    CCHub
                  </h6>
                  <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
                    {location}, {state}
                  </p>
                </div>
              )}

              {/* {profiles.length > 0 && (
                <div className="grid gap-2 w-full h-fit">
                  <ModalText
                    img="/crown.svg"
                    text={`${profiles.length} people are going`}
                  />
                  <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
                    {profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70"
                      >
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="size-[66px] rounded-full"
                        />
                        <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                          {profile.name}
                        </h6>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </section>
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      <div className="fixed inset-0 h-full z-30 bg-transparent flex lg:hidden">
        <div className="w-full h-[calc(100vh-64px)] absolute left-0 top-[64px] px-4 pt-4 pb-12 bg-[#E8E8E8] z-40 grid gap-4 lg:hidden overflow-y-auto scrollbar-hide">
          <div className="w-full h-fit flex justify-between items-center">
            <img
              src="/arrow-left.svg"
              className="size-8 cursor-pointer"
              onClick={closeModal}
              alt="Close modal"
            />
            <div className="size-fit p-[6px] rounded-full bg-white flex justify-center items-center cursor-pointer">
              <img src="/send.svg" className="size-4" alt="Send" />
            </div>
          </div>

          <div className="w-full h-fit grid gap-4 items-center justify-center">
            <section className="w-[100%] h-fit gap-[6px]">
              <h1 className="paytone capitalize text-black font-[400] text-[20px]">
                {eventName}
              </h1>
              <div className="flex gap-[6px]">
                <ModalText
                  img="/modal-location.svg"
                  text="5 Mabushi way, Abuja."
                />
                <ModalText img="/timer.svg" text="6:30pm" />
              </div>
            </section>
            <img
              src={eventImg}
              alt="Event"
              className="rounded-3xl w-[75%] sm:size-[350px] mx-auto"
            />
            <section className="grid gap-4 w-full">
              <div className="gap-1 grid">
                <ModalText img="/crown.svg" text="hosts" />
                <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70">
                  <img
                    src="/tiny-profile.png"
                    alt="Host profile"
                    className="w-6 h-6 rounded-full border border-white"
                  />
                  <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                    {hostName}
                  </h6>
                </div>
              </div>
            </section>

            {description && (
              <section className="mt-4 grid gap-2 w-full h-fit">
                <ModalText img="/note-text.svg" text="about event" />
                <h4
                  className={`${
                    isExpanded ? "" : "line-clamp-3"
                  } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}
                >
                  {description}
                </h4>
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
            {amount && (
              <div className="w-full h-fit grid gap-2">
                <ModalText img="/money-add.svg" text="chip in" />
                <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
                  <div className="h-fit w-full grid">
                    <p className="capitalize text-[#8A9191] font-[500] text-[14px] satoshi">
                      Target goal
                    </p>
                    <h6 className="capitalize text-black font-[700] text-[24px] satoshi">
                      ₦ {amount}
                    </h6>
                  </div>
                  <div className="w-full h-fit rounded-[10px] bg-[#518A00]/10">
                    <div className="h-2 w-[10%] rounded-[10px] bg-[#61B42D]"></div>
                  </div>
                  <div className="h-fit w-full flex justify-between">
                    <h6 className="satoshi font-[500] text-[16px]">
                      ₦ {amount}
                    </h6>
                    <h6 className="satoshi font-[500] text-[16px]">
                      ₦ {amount}
                    </h6>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
              <div className="w-full h-fit flex justify-between">
                <div className="h-fit w-fit min-w-[100px] rounded-[20px] p-2 bg-[#866AD2]/10 satoshi text-[10px] font-[500] leading-[14px]">
                  Starting in <span className="text-[#866AD2]">6d 8h</span>
                </div>
              </div>
              {/* <div className="satoshi w-full h-fit grid gap-[10px] items-center">
                <h5 className="text-[14px] font-[700] leading-[20px] text-black flex">
                  Invite a friend too 👉
                </h5>
              </div> */}
            </div>

            {dressCode && (
              <div className="grid gap-2 w-full h-fit">
                <ModalText img="/dress.svg" text="dress code" />
                <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                  {dressCode}
                </h6>
              </div>
            )}

            {location && (
              <div className="grid gap-2 w-full h-fit">
                <ModalText img="/modal-location.svg" text="location" />
                <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
                  CCHub
                </h6>
                <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
                  {location}, {state}
                </p>
              </div>
            )}

            {/* {profiles.length > 0 && (
              <div className="grid gap-2 w-full h-fit">
                <ModalText
                  img="/crown.svg"
                  text={`${profiles.length} people are going`}
                />
                <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70"
                    >
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="size-[66px] rounded-full"
                      />
                      <h6 className="h-fit w-full min-w-[120px] capitalize satoshi font-[700] text-[12px] leading-[18px]">
                        {profile.name}
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
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
