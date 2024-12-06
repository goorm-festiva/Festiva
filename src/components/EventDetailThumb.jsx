import styled from "styled-components";

const EventDetailThumb = ({ data }) => {
  const { MAIN_IMG } = data;
  return (
    <EventDetailThumbWrap>
      <ImgBox>
        <img src={MAIN_IMG} alt="축제 이미지" />
      </ImgBox>
      <BtnBox>
        <HomePageBtn>홈페이지 바로가기</HomePageBtn>
        <ReservationBtn>바로 예매하기</ReservationBtn>
      </BtnBox>
    </EventDetailThumbWrap>
  );
};

const EventDetailThumbWrap = styled.div`
  width: 38%;
  position: relative;

  @media (max-width: 900px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ReservationBtn = styled.button`
  width: 48%;
  font-size: 16px;
  text-align: center;
  padding: 20px 0px;
  background-color: #000;
  color: #fff;
  border: none;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background-color: #ed3da6;
    color: #fff;
    cursor: pointer;
  }
`;

export const HomePageBtn = styled(ReservationBtn)`
  background-color: #fff;
  border: 2px solid #000;
  color: #000;
  padding: 18px 0;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export default EventDetailThumb;
