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
          <div
              style={{
                boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(16px)",
              }}
              className="flex p-[4px] rounded-[20px] bg-white lg:w-fit h-fit w-fit"
            >
              {homeBtn.map((btn) => (
              <div key={btn.name}
                onClick={btn.onClick} 
                className={`items-center py-2 px-[10px] rounded-3xl cursor-pointer w-fit text-center ${activeTab === btn.name ? "bg-[#BEFD66]" : "bg-white"}`}>
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  {btn.name}
                </h5>
              </div>
              ))}
            </div>
        </section>

        <div>{activeTab === "created" ? <MyEvent /> : <AttendedEvents />}</div>
      </div>
    </main>
  );
};

export default NormalHome;
