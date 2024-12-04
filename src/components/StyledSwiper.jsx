import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const StyledSwiper = ({ swiperData, activeEventInfo }) => {
  return (
    <>
      <SwiperContainer
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
      </SwiperContainer>
    </>
  );
};

export default StyledSwiper;

const SwiperContainer = styled(Swiper)`
  width: 35%;
  aspect-ratio: 1 / 1;
  position: relative;
  margin-right: 0;
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
