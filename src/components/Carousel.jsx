import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useFestivalStore } from "../store/festivalStore";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  const { festivalData } = useFestivalStore();
  const swiperData = festivalData.slice(3, 8);

  return (
    <Container>
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
        className="mySwiper"
      >
        {swiperData.map(({ MAIN_IMG, TITLE }, index) => (
          <SwiperSlide key={index}>
            <img src={MAIN_IMG} alt={TITLE} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Container>
  );
};
const Container = styled.div`
  height: 500px;
  padding: 50px 0;
`;

// Swiper 기본 스타일
const DefaultSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
