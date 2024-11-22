import React from "react";
import Nav from "./Nav";
import EventList from "./EventList";
import FilterComponent from "./FilterComponent";
import AllEventNav from "./AllEventNav";

const AllEvent = () => {
  return (
    <div>
      <Nav />
      <AllEventNav />
      <h1>축제 일정</h1>
      <FilterComponent />
      <EventList />
    </div>
  );
};

export default AllEvent;
