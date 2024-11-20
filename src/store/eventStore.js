// src/store/eventStore.js
import { create } from "zustand";

const useEventStore = create((set) => ({
  events: [],
  filteredEvents: [],
  currentPage: 1,
  eventsPerPage: 10,
  setCurrentPage: (page) => set({ currentPage: page }),
  isLoading: false,
  error: null,
  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const API_KEY = "476159464f65756e39315a44436355";
      const response = await fetch(
        `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/100/`
      );
      const data = await response.json();
      set({
        events: data.culturalEventInfo.row,
        filteredEvents: data.culturalEventInfo.row,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  setFilteredEvents: (filteredEvents) => set({ filteredEvents }),
}));

export default useEventStore;
