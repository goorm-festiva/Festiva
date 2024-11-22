import React from "react";
import Nav from "./Nav";
import EventList from "./EventList";

const AllEvent = () => {
  return (
    <div>
      <Nav />
      <div>navList</div>
      <h1>축제 일정</h1>
      <EventList />
    </div>
  );
};

export default AllEvent;
