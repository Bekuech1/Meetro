import { create } from "zustand";
import API from "@/lib/axios";
import { createJSONStorage, persist } from "zustand/middleware";

const CACHE_EXPIRY_MINUTES = 5; // ⏳ set expiry time here

const useEventStore = create(
  persist(
    (set, get) => ({
      myEvents: [],
      attendedEvents: [],
      eventDetails: {},

      loadingMyEvents: false,
      loadingAttendedEvents: false,
      loadingEventDetails: false,

      error: null,
      myEventsTotal: 0,
      totalAttendees: 0,
      attendedEventsTotal: 0,
      shouldRefetch: false,

      lastFetched: null, // 🕒 store timestamp of last fetch

      setShouldRefetch: value => set({ shouldRefetch: value }),
      setEvents: events => set({ myEvents: events }),

      isCacheExpired: () => {
        const { lastFetched } = get();
        if (!lastFetched) return true;
        const now = Date.now();
        const diffMins = (now - lastFetched) / (1000 * 60);
        return diffMins >= CACHE_EXPIRY_MINUTES;
      },

      fetchEvents: async () => {
        const { myEvents, shouldRefetch, isCacheExpired } = get();

        // only skip if we *already have events in memory* and no refetch
        if (myEvents.length > 0 && !shouldRefetch && !isCacheExpired()) {
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
            shouldRefetch: false,
            lastFetched: Date.now(),
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
        const { attendedEvents, shouldRefetch, isCacheExpired } = get();
        if (attendedEvents.length > 0 && !shouldRefetch && !isCacheExpired()) {
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
            shouldRefetch: false,
            lastFetched: Date.now(),
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

      fetchEventById: async id => {
        const existing = get().eventDetails[id];
        if (existing) return existing;

        set({ loadingEventDetails: true });

        try {
          const res = await API.get(`/events/${id}`);
          const event = res.data.event;

          set(state => ({
            eventDetails: {
              ...state.eventDetails,
              [id]: event,
            },
          }));

          return event;
        } catch (err) {
          console.error("Error fetching event by ID:", err);
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
        lastFetched: state.lastFetched, // persist the timestamp
      }),
    }
  )
);

export default useEventStore;
