import GuestsTab from "@/components/manage-event/GuestsTab";
import OverviewTab from "@/components/manage-event/OverviewTab";
import PayoutsTab from "@/components/manage-event/PayoutsTab";
import WithdrawalTab from "@/components/manage-event/WithdrawalTab";
import { eventsApi } from "@/services/eventsApi";
import { useEventStore } from "@/stores/useEventStore";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router";

const ManageEventContext = createContext(undefined);

// Custom hook to use manage event context
export const useManageEventContext = () => {
  const context = useContext(ManageEventContext);

  if (context === undefined) {
    throw new Error("ManageEventContext was used outside provider");
  }

  return context;
};

function ManageEvent() {
  // Get current tab from URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug: eventId } = useParams();
  const tab = searchParams.get("tab") || "overview";
  const location = useLocation();

  // Get event store
  const { setActiveEvent, setIsLoading } = useEventStore();

  // Fetch event data and store it in the event store
  const { data: event } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => eventsApi.getProtectedEvent(eventId),
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    gcTime: 30 * 60 * 1000,
  });

  // Update the event store when data changes
  useEffect(() => {
    if (event) {
      setActiveEvent(event);
      setIsLoading(false);
    } else {
      setActiveEvent(null);
      setIsLoading(true);
    }
  }, [event, setActiveEvent, setIsLoading]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location]);

  const handleTabChange = value => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tab", value);
    setSearchParams(newSearchParams);
  };

  const renderTabContent = () => {
    switch (tab) {
      case "overview":
        return <OverviewTab />;
      case "guests":
        return <GuestsTab />;
      case "payouts":
        return <PayoutsTab />;
      case "withdraw":
        return <WithdrawalTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <ManageEventContext.Provider value={{ tab, handleTabChange }}>
      <main className="bg-[#F0F0F0] h-full relative flex-1 flex flex-col pt-6 w-full pb-10">
        <div className="max-w-[982px] w-full mx-auto flex">
          {renderTabContent()}
        </div>
      </main>
    </ManageEventContext.Provider>
  );
}

export default ManageEvent;
