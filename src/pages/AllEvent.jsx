import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import EventList from "../components/EventList";
import FilterComponent from "../components/FilterComponent";
import AllEventNav from "../components/AllEventNav";
import { useFestivalStore } from "../store/festivalStore";
import { useLocation } from "react-router-dom";

const AllEvent = () => {
  const { festivalData, isLoading, fetchFestivalData, setFilteredEvents } =
    useFestivalStore();

  const location = useLocation();
  const inputValue = location.state?.inputValue || "";
  const [searchTerm, setSearchTerm] = useState(inputValue);

  useEffect(() => {
    fetchFestivalData("축제");
  }, [fetchFestivalData]);

  useEffect(() => {
    if (!festivalData) return;

    let filtered = festivalData;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.TITLE.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [festivalData, searchTerm, setFilteredEvents]);

  const handleDateChange = (range) => {
    const { startDate, endDate } = range;

    if (!startDate || !endDate) {
      setFilteredEvents(festivalData);
      return;
    }

    const filtered = festivalData.filter((event) => {
      const [start, end] = event.DATE.split("~").map(
        (date) => new Date(date.trim())
      );
      return start <= endDate && end >= startDate;
    });

    setFilteredEvents(filtered);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Nav />
      <AllEventNav />
      <h1>축제 일정</h1>
      <FilterComponent
        onDateChange={handleDateChange}
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
      <EventList />
    </div>
  );
};

export default AllEvent;
