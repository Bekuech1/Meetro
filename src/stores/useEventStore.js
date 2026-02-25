import { create } from "zustand";

export const useEventStore = create(set => ({
  activeEvent: null,
  isLoading: true,
  setActiveEvent: event => set({ activeEvent: event }),
  setIsLoading: isLoading => set({ isLoading }),
  clearActiveEvent: () => set({ activeEvent: null }),
}));
