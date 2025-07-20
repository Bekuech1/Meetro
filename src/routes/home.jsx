import React, { useEffect } from "react";
import EmptyHome from "@/components/home/EmptyHome";
import NormalHome from "@/components/home/NormalHome";
import useEventStore from "@/stores/eventStore";

export default function Home() {
  const events = useEventStore((state) => state.events);
  const loading = useEventStore((state) => state.loading);
  const fetchEvents = useEventStore((state) => state.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, []); // only once on mount

  if (loading) {
    return (
      <main className="bg-[#F0F0F0] flex flex-col px-20 py-10 gap-[43px] h-[90vh] max-h-[760px] relative overflow-hidden">
        <div className="h-full w-full flex justify-center items-center text-center">
          <h1 className="paytone text-[#4A3A74] h-fit sm:text-[36px] sm:font-[400] sm:leading-[100%] text-[24px] font-[400] leading-[32px]">
            Events is loading
          </h1>
        </div>

        <div class=" absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
          {/* <!-- Left Ellipse --> */}
          <div class="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>

          {/* <!-- Middle Ellipse --> */}
          <div class="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>

          {/* <!-- Right Ellipse --> */}
          <div class="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
        </div>
      </main>
    );
  }

  const hasEvents = Object.keys(events).length > 0;

  return <div>{hasEvents ? <NormalHome /> : <EmptyHome />}</div>;
}
