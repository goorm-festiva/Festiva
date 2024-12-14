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
        <MainEventItem key={index} data={data} id={index + 1} />
      ))}
    </Container>
  );
};

export const Container = styled.div`
  display: grid;
  width: clamp(910px, 100%, 1400px);
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-auto-rows: 350px;
  margin: 0 auto;
  padding: 20px 50px;
`;

export default MainEvent;
