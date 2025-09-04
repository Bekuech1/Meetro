import React from "react";
// import EmptyHome from "@/components/home/EmptyHome";
import NormalHome from "@/components/home/NormalHome";
// import useEventStore from "@/stores/eventStore";
// import { LoadingSpinner } from "@/components/create-event/Private";

export default function Home() {
  // const myEvents = useEventStore((s) => s.myEvents);
  // const attendedEvents = useEventStore((s) => s.attendedEvents);
  // const loadingMyEvents = useEventStore((state) => state.loadingMyEvents);
  // const loadingAttendedEvents = useEventStore((state) => state.loadingAttendedEvents);
  // const fetchEvents = useEventStore((state) => state.fetchEvents);
  // const fetchAttendedEvents = useEventStore((state) => state.fetchAttendedEvents);

  // useEffect(() => {
  //   fetchEvents();
  //   fetchAttendedEvents();
  // }, []); // only once on mount
  // console.log(myEventsTotal)

  // if (loadingMyEvents || loadingAttendedEvents) {
  //   return (
  //     <main className="bg-[#F0F0F0] flex flex-col px-20 py-10 gap-[43px] h-[90vh] max-h-[760px] relative overflow-hidden">
  //       <div className="h-full w-full flex flex-col gap-2 justify-center items-center text-center">
  //         <LoadingSpinner size={32} />
  //         {/* <h1 className="text-[#4A3A74] h-fit sm:text-[36px] sm:font-[400] sm:leading-[100%] text-[24px] font-[400] leading-[32px]">
  //           Your events are loading....
  //         </h1> */}
  //       </div>

  //       <div className=" absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
  //         {/* <!-- Left Ellipse --> */}
  //         <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>

  //         {/* <!-- Middle Ellipse --> */}
  //         <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>

  //         {/* <!-- Right Ellipse --> */}
  //         <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
  //       </div>
  //     </main>
  //   );
  // }

  // const hasEvents = myEvents.length > 0;
  // const hasAttendedEvents = attendedEvents.length > 0;

  // return (
  //   <div>{hasEvents || hasAttendedEvents ? <NormalHome /> : <EmptyHome />}</div>
  // );
  return <NormalHome />
}
