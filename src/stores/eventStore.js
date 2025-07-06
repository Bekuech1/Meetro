import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "@/lib/axios";

const useEventStore = create(
  persist(
    (set, get) => ({
      events: {}, // grouped by date
      eventDetails: {},
      loading: false,
      error: null,
      totalEvents: 0,
      totalAttendees: 0,

      fetchEvents: async () => {
        if (Object.keys(get().events).length > 0) return;

        set({ loading: true });

        try {
          const response = await API.get("/my-events");
          const { events: eventsArray = [], totalEvents = 0, totalAttendees = 0 } = response.data;

          const grouped = {};

          eventsArray.forEach((event) => {
            const dateStr = event.date;
            if (!dateStr || typeof dateStr !== "string") return;

            const [startRaw, endRaw] = dateStr.includes(" - ")
              ? dateStr.split(" - ")
              : [dateStr, null];

            const startDate = new Date(startRaw.trim());
            const endDate = endRaw && endRaw.toLowerCase() !== "null" ? new Date(endRaw.trim()) : null;

            if (isNaN(startDate)) return;

            const groupKey = startDate.toISOString().split("T")[0];

            const enhancedEvent = {
              ...event,
              startDate,
              endDate,
            };

            if (!grouped[groupKey]) grouped[groupKey] = [];
            grouped[groupKey].push(enhancedEvent);
          });

          set({
            events: grouped,
            totalEvents,
            totalAttendees,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error("Error fetching events:", error);
          set({ loading: false, error: error.message });
        }
      },

      fetchEventById: async (id) => {
        const existing = get().eventDetails[id];
        if (existing) return existing;

        try {
          const response = await API.get(`/events/${id}`);
          const event = response.data.event;

          set((state) => ({
            eventDetails: {
              ...state.eventDetails,
              [id]: event,
            },
          }));

          return event;
        } catch (error) {
          console.error("Failed to fetch event by ID:", error);
        }
      },
    }),
    {
      name: "event-store",
      partialize: (state) => ({
        events: state.events,
        eventDetails: state.eventDetails,
        totalEvents: state.totalEvents,
        totalAttendees: state.totalAttendees,
      }),
    }
  )
);

export default useEventStore;
