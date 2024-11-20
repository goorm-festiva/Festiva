import React, { useEffect } from "react";
import FilterComponent from "./FilterComponent";
import EventList from "./EventList";
import Pagination from "./Pagination";
import useEventStore from "../store/eventStore";

const AllEvent = () => {
  const {
    fetchEvents,
    filteredEvents,
    currentPage,
    eventsPerPage,
    setCurrentPage,
  } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // 현재 페이지의 이벤트만 선택
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  return (
    <div>
      <div>navList</div>
      <h1>전체 일정</h1>
      <FilterComponent />
      <EventList events={currentEvents} />
      <Pagination
        eventsPerPage={eventsPerPage}
        totalEvents={filteredEvents.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AllEvent;
