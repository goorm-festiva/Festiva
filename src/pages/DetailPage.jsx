import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFestivalStore } from "../store/festivalStore";
import styled from "styled-components";
import EventDetailThumb from "../components/EventDetailThumb";
import EventDetailBox from "../components/EventDetailBox";

const DetailPage = () => {
  const { id } = useParams();
  const { festivalData, fetchFestivalData } = useFestivalStore();

  useEffect(() => {
    if (!festivalData) {
      fetchFestivalData("축제", 1, 10);
    }
  }, [festivalData, fetchFestivalData]);

  if (!festivalData || !festivalData[id]) {
    return <p>Loading data...</p>;
  }

  const data = festivalData[id];

  return (
    <DetailPageWrap>
      <EventDetailThumb data={data} />
      <EventDetailBox data={data} />
    </DetailPageWrap>
  );
};

const DetailPageWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 50px;
`;

export default DetailPage;
