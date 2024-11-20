import React from "react";
import { v4 } from "uuid";

const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={v4()}>
          <h3>{event.TITLE}</h3>
          <p>{event.DATE}</p>
          <p>{event.PLACE}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
