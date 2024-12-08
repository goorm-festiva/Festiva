import { useFestivalStore } from "../store/festivalStore";
import { useEffect, useRef } from "react";
import Carousel from "../components/Carousel";
import MainEvent from "../components/MainEvent";
import Nav from "../components/Nav";

const Home = () => {
  const { isLoading, fetchFestivalData, festivalData } = useFestivalStore();
  const isFetched = useRef(false); // API 호출 여부를 추적

  //데이터 패치
  useEffect(() => {
    if (!isFetched.current) {
      fetchFestivalData("축제", 1, 10);
      isFetched.current = true; // 이후 중복 실행 방지
    }
    console.log(festivalData);
  }, [fetchFestivalData]);

  //isLoading: 이미지를 불러오기 전에는 map이 실행되지 않도록 함
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <>
      {/* <Nav></Nav> */}
      <Carousel></Carousel>
      <MainEvent />
    </>
  );
};

export default Home;
