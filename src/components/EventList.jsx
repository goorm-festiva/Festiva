import React, { useEffect } from "react";
import { useFestivalStore } from "../store/useFestivalStore";

const EventList = () => {
  const { festivalData, isLoading, fetchFestivalData } = useFestivalStore();

  useEffect(() => {
    fetchFestivalData("축제");
  }, [fetchFestivalData]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      {festivalData &&
        festivalData.map((event, index) => (
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
