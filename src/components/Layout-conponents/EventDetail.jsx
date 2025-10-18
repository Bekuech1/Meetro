import React, { useEffect, useState } from "react";

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
    <div className="w-full">
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
        <section className=""></section>
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
