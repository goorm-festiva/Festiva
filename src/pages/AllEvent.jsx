import React, { useEffect, useState } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import EventList from "../components/EventList";
import FilterComponent from "../components/FilterComponent";
import AllEventNav from "../components/AllEventNav";
import { useFestivalStore } from "../store/festivalStore";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const AllEvent = () => {
  const { festivalData, isLoading, fetchFestivalData, setFilteredEvents } =
    useFestivalStore();

  const location = useLocation();
  const inputValue = location.state?.inputValue || "";
  const [searchTerm, setSearchTerm] = useState(inputValue);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastEventElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    fetchFestivalData("축제", page);
  }, [fetchFestivalData, page]);

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
    <>
      <Head>
        <AllEventNav />
        <h1>축제 일정</h1>
      </Head>
      <Container>
        <FilterComponent
          onDateChange={handleDateChange}
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
        <EventList
          events={festivalData}
          lastEventElementRef={lastEventElementRef}
        />
        {isLoading && <div>로딩 중...</div>}
      </Container>
    </>
  );
};

const Head = styled.div`
  padding: 20px 50px;
  margin: 0 auto;
  max-width: 1200px;
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px 50px;
  max-width: 1200px;
`;

export default AllEvent;
