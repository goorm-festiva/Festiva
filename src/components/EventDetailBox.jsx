import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import dateFormatter from "../util/dateFormatter";
import { HomePageBtn } from "./EventDetailThumb";

const EventDetailBox = ({ data }) => {
  const moreInfo = {
    "주최 기관": data.ORG_NAME,
    이용대상: data.USE_TRGT,
    유무료: data.IS_FREE,
    이용요금: data.USES_FEE,
  };

  const formatDateWithDay = (dateString) => {
    const padZero = (num) => String(num).padStart(2, "0");

    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const newDate = new Date(dateString);

    const year = newDate.getFullYear();
    const month = padZero(newDate.getMonth() + 1);
    const day = padZero(newDate.getDate());
    const dateOfWeek = days[newDate.getDay()];

    return `${year}.${month}.${day} (${dateOfWeek})`;
  };

  return (
    <EventDetailBoxWrap>
      <Header>
        <HeaderTop>
          <span>{data.CODENAME}</span>
          <FaRegHeart />
        </HeaderTop>
        <h2>{data.TITLE}</h2>
        <h3>{dateFormatter(data.DATE)}</h3>
      </Header>
      <Schedule>
        <ScheduleItem>
          <h4>축제 기간</h4>
          <p>{formatDateWithDay(data.STRTDATE)}</p>
          <p>{formatDateWithDay(data.END_DATE)}</p>
        </ScheduleItem>
        <ScheduleItem>
          <h4>관람 장소</h4>
          <p>{data.PLACE}</p>
        </ScheduleItem>
      </Schedule>
      <MoreInfo>
        {Object.entries(moreInfo).map(([category, value], index) => (
          <MoreInfoItem key={index}>
            <h3>{category}</h3>
            <p>{value || "없음"}</p>
          </MoreInfoItem>
        ))}
      </MoreInfo>
      <HomePageBtn>목록으로 가기</HomePageBtn>
    </EventDetailBoxWrap>
  );
};

const EventDetailBoxWrap = styled.div`
  width: 55%;
  height: auto;

  @media (max-width: 900px) {
    width: 100%;
    margin: 50px auto;
  }
`;

const Header = styled.div`
  h2 {
    font-size: clamp(30px, 3vw, 36px);
  }

  h3 {
    font-size: clamp(18px, 2vw, 23px);
    font-weight: 900;
    margin-top: 35px;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  span {
    font-size: 13px;
    border: 1.5px solid #000;
    padding: 5px 10px;
    border-radius: 20px;
  }

  svg {
    font-size: 24px;
  }
`;

const Schedule = styled.div`
  margin-top: 35px;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
`;

const ScheduleItem = styled.div`
  border-top: 1px solid #000;
  padding: 25px 0;
  font-size: 18px;

  h4 {
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 15px;
  }
`;

const MoreInfo = styled.div`
  padding: 60px 0 30px;
`;

const MoreInfoItem = styled.div`
  h3 {
    font-weight: normal;
    color: #767676;
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

export default EventDetailBox;
