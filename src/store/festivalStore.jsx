import { create } from "zustand";
import axios from "axios";

// Festival 데이터를 불러오는 스토어
export const useFestivalStore = create((set) => ({
  festivalData: [],
  filteredEvents: [],
  isLoading: true,
  hasMore: true, // 무한 스크롤을 위한 상태 추가
  currentPage: 1, // 현재 페이지 상태 추가

  fetchFestivalData: async (category, page = 1, itemsPerPage = 20) => {
    try {
      const apiKey = import.meta.env.VITE_APP_FESTIVAL_API_KEY;
      const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/culturalEventInfo/${
        (page - 1) * itemsPerPage + 1
      }/${page * itemsPerPage}/${category}`;
      const { data } = await axios.get(url);

      // API 응답을 로그로 출력
      console.log(data); // 여기서 API 응답을 확인합니다.

      // 데이터 구조를 안전하게 확인하고 설정
      if (
        data &&
        data.culturalEventInfo &&
        Array.isArray(data.culturalEventInfo.row)
      ) {
        const fetchedData = data.culturalEventInfo.row;
        set((state) => ({
          festivalData:
            page === 1 ? fetchedData : [...state.festivalData, ...fetchedData],
          filteredEvents:
            page === 1
              ? fetchedData
              : [...state.filteredEvents, ...fetchedData],
          hasMore: fetchedData.length === itemsPerPage,
          currentPage: page,
        }));
      } else {
        console.error("culturalEventInfo가 응답에 없습니다:", data);
        set({ festivalData: [], filteredEvents: [] }); // 빈 배열로 설정
      }
    } catch (error) {
      console.error("축제 데이터를 가져오는 중 오류 발생:", error.message);
      set({ festivalData: [], filteredEvents: [] }); // 오류 처리
    } finally {
      set({ isLoading: false });
    }
  },

  setFilteredEvents: (events) => set({ filteredEvents: events }), // 필터링된 이벤트 설정
}));
