import { create } from "zustand";
import API from "@/lib/axios";
import { createJSONStorage, persist } from "zustand/middleware";

const CACHE_EXPIRY_MINUTES = 2; // ⏳ set expiry time here

const useEventStore = create(
  persist(
    (set, get) => ({
      myEvents: [],
      attendedEvents: [],
      loadingMyEvents: false,
      loadingAttendedEvents: false,

      error: null,
      myEventsTotal: 0,
      totalAttendees: 0,
      attendedEventsTotal: 0,
      shouldRefetchEvents: false,
      shouldRefetchAttendedEvents: false,
      lastFetchedEvents: null,
      lastFetchedAttendedEvents: null,

      setShouldRefetchEvents: value => set({ shouldRefetchEvents: value }),
      setShouldRefetchAttendedEvents: value =>
        set({ shouldRefetchAttendedEvents: value }),
      setEvents: events => set({ myEvents: events }),

      isCacheExpired: timestamp => {
        if (!timestamp) return true;
        const now = Date.now();
        const diffMins = (now - timestamp) / (1000 * 60);
        return diffMins >= CACHE_EXPIRY_MINUTES;
      },

      fetchEvents: async () => {
        const {
          myEvents,
          shouldRefetchEvents,
          isCacheExpired,
          lastFetchedEvents,
        } = get();

        // only skip if we *already have events in memory* and no refetch
        if (
          myEvents.length > 0 &&
          !shouldRefetchEvents &&
          !isCacheExpired(lastFetchedEvents)
        ) {
          return myEvents;
        }

        set({ loadingMyEvents: true });

        try {
          const res = await API.get("/my-events");
          const { events = [], totalEvents = 0, totalAttendees = 0 } = res.data;

          set({
            myEvents: events,
            myEventsTotal: totalEvents,
            totalAttendees,
            loadingMyEvents: false,
            error: null,
            shouldRefetchEvents: false,
            lastFetchedEvents: Date.now(),
          });

          return events;
        } catch (err) {
          set({
            myEvents: [],
            myEventsTotal: 0,
            totalAttendees: 0,
            loadingMyEvents: false,
            error: err.message,
          });
        }
      },

      fetchAttendedEvents: async () => {
        const {
          attendedEvents,
          shouldRefetchAttendedEvents,
          lastFetchedAttendedEvents,
          isCacheExpired,
        } = get();
        if (
          attendedEvents.length > 0 &&
          !shouldRefetchAttendedEvents &&
          !isCacheExpired(lastFetchedAttendedEvents)
        ) {
          return attendedEvents;
        }

        set({ loadingAttendedEvents: true });

        try {
          const res = await API.get("/attended-events");
          const { events = [] } = res.data;

          set({
            attendedEvents: events,
            attendedEventsTotal: events.filter(
              event => event.response === "yes"
            ).length,
            loadingAttendedEvents: false,
            error: null,
            shouldRefetchAttendedEvents: false,
            lastFetchedAttendedEvents: Date.now(),
          });

          return events;
        } catch (err) {
          set({
            attendedEvents: [],
            attendedEventsTotal: 0,
            loadingAttendedEvents: false,
            error: err.message,
          });
        }
      },
    }),
    {
      name: "event-store",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        myEvents: state.myEvents,
        attendedEvents: state.attendedEvents,
        eventDetails: state.eventDetails,
        myEventsTotal: state.myEventsTotal,
        totalAttendees: state.totalAttendees,
        attendedEventsTotal: state.attendedEventsTotal,
        lastFetchedEvents: state.lastFetchedEvents, // persist the timestamp
        lastFetchedAttendedEvents: state.lastFetchedAttendedEvents,
      }),
    }
  )
);

export default useEventStore;
