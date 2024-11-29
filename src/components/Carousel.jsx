import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useFestivalStore } from "../store/festivalStore";
import { GoArrowUpRight } from "react-icons/go";
import { useState } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import dateFormatter from "../util/dateFormatter";

const Carousel = () => {
  const { festivalData } = useFestivalStore();
  const swiperData = festivalData.slice(3, 8);
  const [info, setInfo] = useState(swiperData[0]);

  const activeEventInfo = (swiper) => {
    console.log(swiper.realIndex);
    setInfo(swiperData[swiper.realIndex]);
  };

  return (
    <CarouselWrap>
      <Container>
        <FestivalInfo>
          <div>
            <span>What's On</span>
            <h1>{info.TITLE}</h1>
          </div>
          <div>
            <p>{dateFormatter(info.DATE)}</p>
            <p>{info.PLACE}</p>
          </div>
          <LinkDetail to="">
            <GoArrowUpRight size={250} />
          </LinkDetail>
        </FestivalInfo>
        <StyledSwiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={800}
          onSlideChange={activeEventInfo}
          className="mySwiper"
        >
          {swiperData.map(({ MAIN_IMG, TITLE }, index) => (
            <SwiperSlide key={index}>
              <img src={MAIN_IMG} alt={TITLE} />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </Container>
    </CarouselWrap>
  );
};

const CarouselWrap = styled.div`
  width: 100%;
  height: 500px;
  margin: 50px 0 80px;
`;

const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const FestivalInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  span {
    font-size: 1.4rem;
    font-weight: 800;
    color: #ed3da6;
  }

  h1 {
    font-size: 3.2rem;
    margin-top: 15px;
  }

  p:nth-of-type(1) {
    font-size: 1.25rem;
    font-weight: 700;
  }

  p:nth-of-type(2) {
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 10px;
  }
`;

const LinkDetail = styled(Link)`
  position: absolute;
  bottom: -4rem;
  right: 0;
  color: #000;
`;

// Swiper 기본 스타일
const DefaultSwiper = styled(Swiper)`
  width: 35%;
  height: 100%;
  aspect-ratio: 3 / 4; /* 정사각형 비율 유지 */
  margin: 0;

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledSwiper = styled(DefaultSwiper)`
  .swiper-pagination-bullet {
    background-color: #333;
  }

  .swiper-pagination-bullet-active {
    background-color: #000;
  }
`;
export default Carousel;
