// src/components/AllEvent.js
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import EventList from "../components/EventList";
import FilterComponent from "../components/FilterComponent";
import AllEventNav from "../components/AllEventNav";
import { useFestivalStore } from "../store/festivalStore";

const AllEvent = () => {
  const { festivalData, isLoading, fetchFestivalData, setFilteredEvents } =
    useFestivalStore();

  useEffect(() => {
    fetchFestivalData("축제");
  }, [fetchFestivalData]);

  const handleDateChange = (range) => {
    const { startDate, endDate } = range;

    // 이벤트 필터링 로직
    const filtered = festivalData.filter((event) => {
      // DATE가 범위 문자열인 경우
      const [start, end] = event.DATE.split("~").map(
        (date) => new Date(date.trim())
      );

      // 선택된 날짜 범위와 비교
      return start <= endDate && end >= startDate; // 선택된 범위와 이벤트 범위가 겹치는지 확인
    });

    setFilteredEvents(filtered); // 필터링된 이벤트를 Zustand 스토어에 저장
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Nav />
      <AllEventNav />
      <h1>축제 일정</h1>
      <FilterComponent onDateChange={handleDateChange} />
      <EventList />{" "}
    </div>
  );
};

export default AllEvent;
