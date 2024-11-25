// src/components/FilterComponent.js
import React, { useState } from "react";
import { DateRange } from "react-date-range"; // 날짜 범위 선택기
import "react-date-range/dist/styles.css"; // 스타일 가져오기
import "react-date-range/dist/theme/default.css"; // 테마 가져오기

const FilterComponent = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    onDateChange(ranges.selection); // 부모 컴포넌트에 선택된 날짜 범위를 전달
  };

  return (
    <div>
      <input type="search" placeholder="Search" />

      <DateRange
        ranges={dateRange}
        onChange={handleSelect}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
      />
    </div>
  );
};

export default FilterComponent;
