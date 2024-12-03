import React, { useState } from "react";
import { DateRange } from "react-date-range"; // 날짜 범위 선택기
import "react-date-range/dist/styles.css"; // 스타일 가져오기
import "react-date-range/dist/theme/default.css"; // 테마 가져오기
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const FilterComponent = ({ onDateChange, onSearchChange, searchTerm }) => {
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

  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <Container>
      <InputContainer>
        <input
          type="search"
          placeholder="Search"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <span>
          <IoIosSearch size={24} />
        </span>
      </InputContainer>
      <ListFilter>
        <StyledDateRange
          ranges={dateRange}
          onChange={handleSelect}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
        />
      </ListFilter>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  input {
    position: absolute;
    font-size: 1rem;
    line-height: normal;
    color: #000;
    display: block;
    width: 336px;
    margin-bottom: 30px;
    padding: 0.7rem 0.7rem;
    border: 2px solid #000;
  }

  span {
    position: relative;
    top: 10px;
    right: -300px;
  }
`;

const ListFilter = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 40px;
  text-color: white;
  border: 2px solid #000;
  background-color: black;
`;

const StyledDateRange = styled(DateRange)`
  .rdrDateRangeWrapper {
    background-color: black;
    color: white;
  }

  .rdrDateDisplayWrapper {
    background-color: black;
  }

  .rdrCalendarWrapper {
    background-color: black !important;
  }

  .rdrMonthAndYearWrapper {
    background-color: black !important;
    color: white;
  }

  .rdrMonth {
    background-color: black !important;
  }

  .rdrDays {
    background-color: black !important;
  }

  .rdrDayNumber span {
    color: white !important;
  }

  .rdrDay {
    background-color: black !important;
  }

  input {
    background-color: black;
    // border: 1px solid #333;
  }

  button {
    background-color: #333;
  }

  select {
    color: white;
  }

  .rdrPprevButton {
    i {
      border-color: transparent white transparent transparent;
    }
  }
  .rdrNextButton {
    i {
      border-color: transparent transparent transparent white;
    }
  }
`;
export default FilterComponent;
