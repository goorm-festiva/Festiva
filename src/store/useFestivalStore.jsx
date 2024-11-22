import { create } from "zustand";
import axios from "axios";

// Festival 데이터를 불러오는 스토어
export const useFestivalStore = create((set) => ({
  festivalData: null,
  isLoading: true,
  fetchFestivalData: async (category, start = 1, end = 300) => {
    try {
      const apiKey = import.meta.env.VITE_APP_FESTIVAL_API_KEY;
      const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalEventInfo/${start}/${end}/${category}`;
      const { data } = await axios.get(url);
      set({ festivalData: data["culturalEventInfo"]["row"] }); // 필요한 데이터만 저장
    } catch (error) {
      console.error("Error fetching festival data:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
