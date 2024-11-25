// src/components/EventList.js
import React from "react";
import { useFestivalStore } from "../store/festivalStore";

const EventList = () => {
  const { filteredEvents } = useFestivalStore(); // Zustand 스토어에서 필터링된 이벤트 가져오기

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>등록된 이벤트가 없습니다.</p>;
  }

  return (
    <div>
      {filteredEvents.map((event, index) => (
        <div key={index}>
          <h2>{event.TITLE}</h2>
          <p>{event.DATE}</p>
          {event.MAIN_IMG && (
            <img
              style={{ width: "300px" }}
              src={event.MAIN_IMG}
              alt={event.TITLE}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
