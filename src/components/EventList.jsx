// src/components/EventList.js
import React from "react";
import { useFestivalStore } from "../store/festivalStore";
import styled from "styled-components";
import * as Main from "./MainEvent";
import * as Con from "./MainEventItem";
import * as Feature from "./FeaturedEvent";
import * as M from "./MainEventItem";

const EventList = ({ lastEventElementRef }) => {
  const { filteredEvents } = useFestivalStore();

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p style={{ padding: "0px 50px" }}>등록된 이벤트가 없습니다.</p>;
  }

  return (
    <CustomStyledM>
      {filteredEvents.map((event, index) => (
        <View
          key={event.ID || index}
          ref={index === filteredEvents.length - 1 ? lastEventElementRef : null}
        >
          <ContentBox>
            <h2>{event.TITLE}</h2>
            <p>{event.DATE}</p>
          </ContentBox>
          <ImgBox>
            {event.MAIN_IMG && <img src={event.MAIN_IMG} alt={event.TITLE} />}
          </ImgBox>
        </View>
      ))}
    </CustomStyledM>
  );
};

const CustomStyledM = styled(Main.Container)`
  padding: 0px 50px;
  max-width: 1000px;

  &:hover {
    cursor: pointer;
  }
`;

const View = styled(Feature.ImgBox)`
  display: grid;
  padding: 0px 0px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    div {
      opacity: 1;
    }
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
    font-weight: bold;
  }
`;

const ContentBox = styled(Con.ContentsBox)`
  padding: 30px 20px;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
`;

const ImgBox = styled(M.ImgBox)`
  img {
    width: 100%;
  }
`;

export default EventList;
