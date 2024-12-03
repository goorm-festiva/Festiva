import MainEventItem from "./MainEventItem";
import styled from "styled-components";
import FeaturedEvent from "./FeaturedEvent";
import { useFestivalStore } from "../store/festivalStore";

const MainEvent = () => {
  const { festivalData } = useFestivalStore();
  const [firstData, ...remainingData] = festivalData;

  return (
    <Container>
      <FeaturedEvent firstData={firstData} />
      {remainingData.map((data, index) => (
        <MainEventItem key={index} data={data} />
      ))}
    </Container>
  );
};

export const Container = styled.div`
  width: clamp(910px, 100%, 1400px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-auto-rows: 350px;
  margin: 0 auto;
  padding: 0 50px;
`;

export default MainEvent;
