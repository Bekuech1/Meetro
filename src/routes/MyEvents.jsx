import BottomNavigation from "@/components/event-dashboard/BottomNavigation";
import MyEventsList from "@/components/home/EventsList";

const MyEvents = () => {

  return (
    <main className="bg-[#F0F0F0] h-full relative flex-1 flex flex-col w-full">
       <MyEventsList />
      <BottomNavigation />
    </main>
  );
};

export default MyEvents;
