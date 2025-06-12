import React, { useState } from "react";
import ShareEvent from "./ShareEvent";
import DownloadEvent from "./DownloadEvent";
import {
  Attendance,
  EventCategories,
  ModalBtn,
  ModalText,
} from "../home/EventModal";
import SiteBtn from "../Layout-conponents/SiteBtn";

const Eventdetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-8">
      <section className="w-full lg:w-[349px] h-full grid gap-8 relative overflow-y-auto scrollbar-hide">
        <div className="relative">
          <img
            src="/events-modal.png"
            alt="Event"
            className="rounded-3xl w-full lg:w-[393px] h-[318px] lg:h-[349px]"
          />
          <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
            <img src="/image.svg" className="z-10" alt="" />
          </div>
        </div>
        <section className="grid gap-4">
          <div className="gap-1 grid">
            {/* Modal Text Component */}
            <ModalText img="crown.svg" text="hosts" />
            <div className="rounded-[12px] p-2 flex gap-1 border-[2px] border-white bg-white/70 justify-center items-center">
              <img
                src="/tiny-profile.png"
                alt=""
                className="w-6 h-6 rounded-full border border-white"
              />
              <h6 className="satoshi text-[16px] font-[500] capitalize w-full text-left">
                Newman, Victory, Beko
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

      {/* other event details on the right*/}
      <section className="w-full lg:w-[569px] sm:h-full h-fit sm:overflow-y-auto scrollbar-hide grid gap-6">
        <div className="flex w-full h-fit gap-2">
          <div className="grid w-full h-fit gap-2 text-start">
            <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
              tech unwind
            </h1>
            <ModalText img="/timer.svg" text="Sat, Mar 1, 16:30pm" />
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
          <div className="hidden md:flex flex-row gap-2">
            <ShareEvent />
            <DownloadEvent />
          </div>
        </div>

        <div className="w-full h-fit grid gap-2">
          {/* ModalText Component */}
          <ModalText img="/note-text.svg" text="about event" />

          {/* H4 Element */}
          <h4
            className={`${
              isExpanded ? "" : "line-clamp-3"
            } text-[#011F0F] font-[500] text-[16px] leading-[24px] text-left satoshi transition-all duration-300 ease-in-out`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. Curabitur ultrices eu lorem ut volutpat. Sed id
            ligula sit amet libero pulvinar egestas. Morbi scelerisque euismod
            justo nec scelerisque. Nam ultricies nulla quis nunc facilisis, in
            commodo augue placerat. Vivamus feugiat, lorem eget varius
            sollicitudin, lorem mauris tristique metus, id cursus odio nisi nec
            nunc. Fusce nec arcu vel neque consectetur auctor.
          </h4>

          {/* Read More Button */}
          <button
            onClick={toggleReadMore}
            className="text-[#7A60BF] font-[700] text-[16px] leading-[24px] satoshi w-fit">
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>

        {/* <div className="w-full h-fit grid gap-2">
          <ModalText img="money-add.svg" text="chip in" />

          <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
            <div className="h-fit w-full grid">
              <p className="capitalize text-[#8A9191] font-[500] text-[14px] leading-[20px] satoshi ">
                Target goal
              </p>
              <h6 className="capitalize text-black font-[700] text-[24px] leading-[32px] satoshi ">
                ₦ 1000
              </h6>
            </div>
            <div className="w-full h-fit rounded-[10px] bg-[#518A00]/10">
              <div className="h-2 w-[40%] rounded-[10px] bg-[#61B42D]"></div>{" "}
              
            </div>
            <div className="h-fit w-full flex justify-between">
              <h6 className="satoshi font-[500] text-[16px] leading-[24px]">
                ₦ 1000
              </h6>
              <h6 className="satoshi font-[500] text-[16px] leading-[24px]">
                ₦ 1000
              </h6>
            </div>
          </div>
        </div> */}

        {/* <section className="w-full h-fit flex gap-2">
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
        </section> */}

        <div className="rounded-[12px] p-4 grid gap-4 border-[2px] border-white text-left bg-white/70">
          <div className="w-full h-fit flex justify-between">
            <div className="w-full h-fit grid gap-1 satoshi">
              <h5 className="text-[16px] font-[700] leading-[24px] text-black">
                ✅ You’re going!
              </h5>
              <p className="text-[14px] font-[500] leading-[20px] text-[#8A9191]">
                We'll send you reminders and updates so you don’t miss a thing.
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
            casual
          </h6>
        </div>
        <div className="grid gap-2 w-full h-fit">
          <ModalText img="/modal-location.svg" text="location" />
          <h6 className="satoshi text-[16px] font-[500] leading-[24px] text-black capitalize w-fit">
            CCHub
          </h6>
          <p className="satoshi text-[12px] font-[700] leading-[18px] text-black capitalize w-fit">
            294 Herbert Macaulay Wy, Sabo yaba, Lagos 101245, Lagos, Nigeria
          </p>
        </div>

        {/* have to map attendees */}
        <div className="grid gap-2 w-full h-fit">
          <ModalText img="/crown.svg" text="going (280)" />
          <div className="flex gap-4 w-full h-fit overflow-x-auto scrollbar-hide">
            <div className="rounded-[12px] p-5 flex flex-col gap-1 border-[2px] border-white justify-center items-center bg-white/70">
              <img
                src="large-profile.jpg"
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
  );
};

export default Eventdetails;
