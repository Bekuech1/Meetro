import React, { useState } from "react";
import MyEvent from "./MyEvent";
import AttendedEvents from "./AttendedEvents";

const NormalHome = () => {
  const [activeTab, setActiveTab] = useState("going");

  const homeBtn = [
    { name: "created", onClick: () => setActiveTab("created") },
    { name: "going", onClick: () => setActiveTab("going") },
  ];

  return (
    <main className="bg-[#F0F0F0] relative min-h-[90vh] w-full grid gap-[43px] md:px-20 px-4 py-10">
      <div className="grid md:w-[680px] w-full h-fit mx-auto gap-6 z-10">
        <section className="flex justify-between items-center h-fit">
          <h1 className="paytone capitalize text-[#055962] sm:text-[30px] text-[20px] font-[400]">
            my events
          </h1>

          <div className="bg-white text-[12px] p-0.5 font-bold rounded-[20px] flex ">
            {homeBtn.map((btn) => (
              <button
                key={btn.name}
                onClick={btn.onClick}
                className={`satoshi py-1 pr-2.5 pl-2 rounded-[24px] text-[#010E1F] ${
                  activeTab === btn.name ? "bg-[#BEFD66] " : ""
                }`}
              >
                {btn.name}
              </button>
            ))}
          </div>
        </section>

        <div>{activeTab === "created" ? <MyEvent /> : <AttendedEvents />}</div>
      </div>
    </main>
  );
};

export default NormalHome;
