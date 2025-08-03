import { create } from "zustand";
import API from "@/lib/axios";

const useEventStore = create((set, get) => ({
  events: [],
  eventDetails: {},
  loading: false,
  error: null,
  totalEvents: 0,
  totalAttendees: 0,
  shouldRefetch: false,

  setShouldRefetch: (value) => set({ shouldRefetch: value}),

  fetchEvents: async () => {
    if (get().events.length > 0 && !get().shouldRefetch) return get().events;

    set({ loading: true });

    try {
      const res = await API.get("/my-events");
      const { events = [], totalEvents = 0, totalAttendees = 0 } = res.data;

      set({
        events,
        totalEvents,
        totalAttendees,
        loading: false,
        error: null,
        shouldRefetch: false,
      });

      return events;
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  fetchEventById: async (id) => {
    const existing = get().eventDetails[id];
    if (existing) return existing;

    try {
      const res = await API.get(`/events/${id}`);
      const event = res.data.event;

      set((state) => ({
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
}));



export default useEventStore;
