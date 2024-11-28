import { useFestivalStore } from "../store/festivalStore";
import { useEffect } from "react";
import Carousel from "../components/Carousel";
import MainEvent from "../components/MainEvent";
import Nav from "../components/Nav";

const Home = () => {
  const { isLoading, fetchFestivalData } = useFestivalStore();

  //데이터 패치
  useEffect(() => {
    fetchFestivalData("축제", 1, 10);
  }, []);

  //isLoading: 이미지를 불러오기 전에는 map이 실행되지 않도록 함
  if (isLoading) {
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
