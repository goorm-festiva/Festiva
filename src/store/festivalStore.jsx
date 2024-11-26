import { create } from "zustand";
import axios from "axios";

// Festival 데이터를 불러오는 스토어
export const useFestivalStore = create((set) => ({
  festivalData: null,
  filteredEvents: null, // 필터링된 이벤트를 위한 새로운 상태
  isLoading: true,
  fetchFestivalData: async (category, start = 1, end = 300) => {
    try {
      const apiKey = import.meta.env.VITE_APP_FESTIVAL_API_KEY;
      const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalEventInfo/${start}/${end}/${category}`;
      const { data } = await axios.get(url);

      // API 응답을 로그로 출력
      console.log(data); // 여기서 API 응답을 확인합니다.

      // 데이터 구조를 안전하게 확인하고 설정
      if (data && data.culturalEventInfo && data.culturalEventInfo.row) {
        const fetchedData = data.culturalEventInfo.row;
        set({
          festivalData: fetchedData,
          filteredEvents: fetchedData, // 초기에 모든 이벤트를 filteredEvents에도 설정
        });
      } else {
        console.error("예상치 못한 API 응답 구조:", data);
        set({ festivalData: [], filteredEvents: [] }); // 빈 배열로 설정
      }
    } catch (error) {
      console.error("축제 데이터를 가져오는 중 오류 발생:", error);
      set({ festivalData: [], filteredEvents: [] }); // 오류 처리
    } finally {
      set({ isLoading: false });
    }
  },
  setFilteredEvents: (events) => set({ filteredEvents: events }), // 필터링된 이벤트 설정
}));
