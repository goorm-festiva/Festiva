import styled from "styled-components";
import dateFormatter from "../util/dateFormatter";

const MainEventItem = ({ data }) => {
  const { CODENAME, DATE, TITLE, MAIN_IMG } = data;

  return (
    <EventCard>
      <ImgBox>
        <img src={MAIN_IMG} />
      </ImgBox>
      <ContentsBox>
        <Tag>{CODENAME}</Tag>
        <Title>{TITLE}</Title>
        <Date>{dateFormatter(DATE)}</Date>
      </ContentsBox>
    </EventCard>
  );
};

export const EventCard = styled.div`
  position: relative;
  border: 2px solid #000000;
  margin: -2px -2px 0px 0px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    div {
      opacity: 1;
    }
  }
`;

export const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 0.2s;
  img {
    width: 100%;
  }
`;

export const ContentsBox = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
`;

const Tag = styled.p`
  font-size: 12px;
`;

const Title = styled.h3`
  font-size: 20px;
`;

const Date = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

export default MainEventItem;
