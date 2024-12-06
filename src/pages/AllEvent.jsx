import React, { useCallback, useEffect, useRef, useState } from "react";
import EventList from "../components/EventList";
import FilterComponent from "../components/FilterComponent";
import AllEventNav from "../components/AllEventNav";
import { useFestivalStore } from "../store/festivalStore";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const AllEvent = () => {
  const { festivalData, isLoading, fetchAllFestivalData, setFilteredEvents } =
    useFestivalStore();
  const location = useLocation();
  const inputValue = location.state?.inputValue || "";
  const [searchTerm, setSearchTerm] = useState(inputValue);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const INITIAL_LOAD_COUNT = 21;
  const ITEMS_PER_PAGE = 20;

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
    fetchAllFestivalData("축제");
  }, []);

  useEffect(() => {
    if (!festivalData) return;
    let filtered = festivalData;
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.TITLE.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
    setHasMore(filtered.length > page * ITEMS_PER_PAGE);
    setDisplayedEvents(
      filtered.slice(0, INITIAL_LOAD_COUNT + (page - 1) * ITEMS_PER_PAGE)
    );
  }, [festivalData, searchTerm, page]);

  const handleDateChange = (range) => {
    const { startDate, endDate } = range;
    if (!startDate || !endDate) {
      setFilteredEvents(festivalData);
      setPage(1);
      return;
    }
    const filtered = festivalData.filter((event) => {
      const [start, end] = event.DATE.split("~").map(
        (date) => new Date(date.trim())
      );
      return start <= endDate && end >= startDate;
    });
    setFilteredEvents(filtered);
    setDisplayedEvents(filtered.slice(0, INITIAL_LOAD_COUNT));
    setPage(1);
    setHasMore(filtered.length > INITIAL_LOAD_COUNT);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

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
          events={displayedEvents}
          lastEventElementRef={lastEventElementRef}
        />
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
