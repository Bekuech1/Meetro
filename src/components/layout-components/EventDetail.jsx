import React, { useEffect, useState } from "react";
import TagButton from "./Buttons/TagButton";
import {
  ArrowRight2,
  Calendar1,
  Location,
  Maximize1,
  Money3,
  Send2,
} from "iconsax-reactjs";
import EventStatus from "./EventStatus";
import IconButton from "./Buttons/IconButton";
import AttendanceStatus from "./AttendanceStatus";
import AvatarGroup from "./AvatarGroup";
import Alert from "./Alert";
import ConfirmationButton from "./Buttons/ConfirmationButton";
import TextButton from "./Buttons/TextButtons";

export const EventDetail = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer);
  }, []);

  // Extract date/time parts
  const day = String(currentTime.getDate()).padStart(2, "0");
  const hour = String(currentTime.getHours()).padStart(2, "0");
  const minute = String(currentTime.getMinutes()).padStart(2, "0");
  const second = String(currentTime.getSeconds()).padStart(2, "0");

  return (
    <div className="w-full bg-[#F0F0F0]">
      <nav className="bg-[#011F0F] w-full px-8 py-3 flex items-center gap-4">
        <img src="/Logo.svg" alt="Logo" className="size-6" />
        <div className="w-full flex justify-end gap-4 items-center">
          <span className="text-lg font-normal paytone text-[#55695E]">
            start time
          </span>
          <div className="flex size-fit">
            <DigitalTime time={day} unit="d" />
            <h6 className="text-white font-normal text-xl digital-font">:</h6>
            <DigitalTime time={hour} unit="h" />
            <h6 className="text-white font-normal text-xl digital-font">:</h6>
            <DigitalTime time={minute} unit="m" />
            <h6 className="text-white font-normal text-xl digital-font">:</h6>
            <DigitalTime time={second} unit="s" />
          </div>
        </div>
      </nav>
      <main className="place-items-center">
        <section className="w-[513px] h-fit py-6 flex justify-between">
          <TagButton
            text="Back"
            leftImg="/arrowleft.svg"
            variant="white"
            size="lg"
          />
          <div className="flex gap-4">
            <TagButton
              text="share"
              rightImg={<Send2 color="black" variant="Bold" />}
              variant="white"
              size="lg"
            />
            <TagButton
              text="more details"
              rightImg={<Maximize1 color="black" variant="Bold" />}
              variant="white"
              size="lg"
            />
          </div>
        </section>
        <section className="w-[513px] h-fit flex flex-col gap-6 place-items-center">
          <div className="grid gap-4 place-items-center">
            <div className="grid text-center place-items-center">
              <EventStatus title="draft" size="sm" color="bluegreen" />
              <h1 className="paytone text-2xl font-normal">Lorem ipsum</h1>
            </div>
            <EventStatus title="draft" size="sm" color="bluegreen" />
          </div>
          <img
            src="/events-modal.png"
            alt=""
            className="size-[381px] rounded-3xl aspect-square object-cover"
          />
          <div className="grid gap-2 place-items-center">
            <div className="size-fit flex gap-2 items-center">
              <IconButton
                icon={<Calendar1 variant="bold" color="#866AD2" />}
                variant="tertiary"
              />
              <h6 className="text-base font-medium text-black">
                Saturday, May 1, 2025{" "}
                <span className="text-[#8A9191] ml-2">16:30pm</span>
              </h6>
            </div>
            <div className="size-fit flex gap-2 items-center">
              <TagButton
                size="md"
                text="abuja"
                variant="light-purple"
                leftImg={<Location color="#7A60BF" variant="Bold" />}
              />
              <TagButton
                text="From - N50,000"
                variant="light-purple"
                leftImg={<Money3 color="#7A60BF" variant="Bold" />}
              />
              <AvatarGroup size="sm" count={100} src="/v2-tinyprofile.jpg" />
              <AttendanceStatus status="going" />
            </div>
          </div>
          <Alert
            type="info"
            option="outline"
            size="sm"
            title="you have manage access"
            onClick={() => {}}
            button={<TagButton text="manage" variant="purple" size="sm" rightImg={<ArrowRight2 size={12}/>}/>}
          />
        </section>
        <section className="w-full place-items-center p-4 bg-gradient-to-b from-[#E8E8E8]/0 to-[#E8E8E8]">
          <div className="w-[513px] flex gap-2">
            <ConfirmationButton variant="going" />
            <ConfirmationButton
              variant="not-sure"
              onClick={() => console.log("clicked")}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const DigitalTime = ({ time, unit }) => {
  return (
    <div className="digital-font flex justify-center items-center">
      <h6 className="text-white font-normal text-xl">{time}</h6>
      <span className="text-[#55695E] font-normal text-sm capitalize">
        {unit}
      </span>
    </div>
  );
};
