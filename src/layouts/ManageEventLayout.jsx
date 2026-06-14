import Footer from "@/components/event-dashboard/Footer";
import ShareEventModal from "@/components/event-dashboard/ShareEventModal";
import { eventsApi } from "@/services/eventsApi";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { Outlet, useParams, useSearchParams } from "react-router";

const ManageEventContext = createContext(undefined);

// Custom hook to use manage event context
export const useManageEventContext = () => {
  const context = useContext(ManageEventContext);

  if (context === undefined) {
    throw new Error(
      "useManageEventContext must be used within ManageEventLayout"
    );
  }

  return context;
};

// Legacy export for backwards compatibility
export const useManageEventData = useManageEventContext;

function ManageEventLayout({ children }) {
  const { slug: eventId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  // Fetch event data
  const { data: event, isLoading } = useQuery({
    queryKey: ["event-protected", eventId],
    queryFn: () => eventsApi.getProtectedEvent(eventId),
    enabled: !!eventId,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    gcTime: 30 * 60 * 1000,
  });

  const handleTabChange = value => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tab", value);
    setSearchParams(newSearchParams);
  };

  return (
    <ManageEventContext.Provider
      value={{ event, loading: isLoading, tab, handleTabChange }}
    >
      <div className="flex flex-col min-h-dvh bg-[#F0F0F0]">
        {children}
        <main className="flex-1 px-4 flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
      {event && !isLoading && <ShareEventModal event={event} />}
    </ManageEventContext.Provider>
  );
}

export default ManageEventLayout;
