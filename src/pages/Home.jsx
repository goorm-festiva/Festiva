import { useFestivalStore } from "../store/festivalStore";
import { useEffect } from "react";
import Carousel from "../components/Carousel";
import MainEvent from "../components/MainEvent";
import Nav from "../components/Nav";

const Home = () => {
  const { isLoading, fetchFestivalData, festivalData } = useFestivalStore();

  //데이터 패치
  useEffect(() => {
    fetchFestivalData("축제", 1, 10);
  }, [fetchFestivalData]);

  if (isLoading || !festivalData || festivalData.length === 0) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <>
      <Nav></Nav>
      <Carousel></Carousel>
      <MainEvent />
    </>
  );
};

export default Home;
