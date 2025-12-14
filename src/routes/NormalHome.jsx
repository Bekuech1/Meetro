import React from "react";
import MyEvents from "../components/home/MyEvents";
import Tabs from "@/components/Layout-conponents/Tabs/Tabs";
import EmptyHome from "@/components/home/EmptyHome";

const NormalHome = () => {
  const events = ["jd"];
  return (
    <main className="bg-[#F0F0F0] h-full relative flex-1 flex flex-col w-full">
      {/* No events */}
      {events.length === 0 ? (
        <EmptyHome />
      ) : (
        <Tabs defaultTab="all">
          <div className="max-w-[680px] w-full mx-auto">
            <section className="flex justify-between flex-col min-[500px]:flex-row gap-4 items-center h-fit mt-10 mb-6">
              <h1 className="paytone capitalize text-[#077D8A] leading-[22px] text-[30px] font-[400]">
                my events
              </h1>
              <Tabs.List
                list={[
                  { id: "all", label: "All" },
                  { id: "upcoming", label: "Upcoming" },
                  { id: "past", label: "Past" },
                ]}
                size="sm"
                btnClassName="min-w-auto px-2"
                className="border border-[#F9F9F9]"
              />
            </section>
            {/* Events list */}
            <div>
              <MyEvents />
            </div>
          </div>
        </Tabs>
      )}
    </main>
  );
};

export default NormalHome;
