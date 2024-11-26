import MainEventItem from "./MainEventItem";
import { useFestivalStore } from "../store/festivalStore";
import { useEffect } from "react";
import styled from "styled-components";

const MainEvent = () => {
  const { festivalData, isLoading, fetchFestivalData } = useFestivalStore();

  //데이터 패치
  useEffect(() => {
    fetchFestivalData("축제", 1, 10);
  }, [fetchFestivalData]);

  //isLoading: 이미지를 불러오기 전에는 map이 실행되지 않도록 함
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <Container>
      {festivalData.map((data, index) => (
        <MainEventItem key={index} data={data} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 350px;
  margin: 0 auto;
  padding: 20px 50px;
  max-width: 1200px;
`;

export default MainEvent;
