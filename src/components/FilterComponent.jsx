import React from "react";
import useEventStore from "../store/eventStore";

const FilterComponent = () => {
  const events = useEventStore((state) => state.events);
  const setFilteredEvents = useEventStore((state) => state.setFilteredEvents);

  const handleFilter = (criteria) => {
    // 여기에 필터링 로직을 구현합니다.
    // 예: 날짜, 카테고리 등으로 필터링
    const filtered = events.filter((event) => {
      // 필터링 조건을 여기에 작성
      return true; // 임시로 모든 이벤트를 반환
    });
    setFilteredEvents(filtered);
  };
  return (
    <>
      <div>
        TopInfoBox
        <input type="search" />
        <div>ListFilter</div>
        <button onClick={() => handleFilter()}>필터 적용</button>
      </div>
    </>
  );
};

export default FilterComponent;
