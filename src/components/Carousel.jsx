import { useFestivalStore } from "../store/festivalStore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import FestivalInfo from "./FestivalInfo";
import StyledSwiper from "./StyledSwiper";

import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  const { festivalData } = useFestivalStore();
  const swiperData = festivalData ? festivalData.slice(0, 5) : [];
  const [info, setInfo] = useState(swiperData[0] || null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (festivalData.length > 0) {
      setInfo(festivalData[0]);
      setCurrentIndex(0);
    }
  }, [festivalData]);

  const activeEventInfo = (swiper) => {
    let index = swiper.realIndex;
    setInfo(swiperData[index]);
    setCurrentIndex(index);
  };

  if (!festivalData || festivalData.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <CarouselWrap>
      <Container>
        <FestivalInfo info={info} index={currentIndex} />
        <StyledSwiper
          activeEventInfo={activeEventInfo}
          swiperData={swiperData}
        />
      </Container>
    </CarouselWrap>
  );
};

const CarouselWrap = styled.div`
  width: 100%;
  padding-top: 4.188rem;
  padding-bottom: 7rem;
`;

const Container = styled.div`
  width: clamp(850px, 100%, 1400px);
  padding: 0 50px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 auto;

  .swiper-pagination-bullet {
    background-color: #333;
    margin: 0 5px;
  }

  .swiper-pagination-bullet-active {
    background-color: #000;
  }
`;

export default Carousel;
