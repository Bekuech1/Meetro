import React from "react";
import NoEvents from "@/components/home/NoEvents";
import BottomNavigation from "@/components/event-dashboard/BottomNavigation";
import MyEventsList from "@/components/home/EventsList";
import { useAuthStore } from "@/stores/useAuthStore";

const MyEvents = () => {
  const { userEventsCount } = useAuthStore();
  const totalUserEvents =
    (userEventsCount?.hosted || 0) + (userEventsCount?.attended || 0);

  return (
    <main className="bg-[#F0F0F0] h-full relative flex-1 flex flex-col w-full">
      {totalUserEvents === 0 ? <NoEvents /> : <MyEventsList />}
      <BottomNavigation />
    </main>
  );
};

export default MyEvents;
