import { IoIosCalendar } from "react-icons/io";
import { RxArrowTopRight } from "react-icons/rx";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigateToDetail } from "../hooks/useNavigateToDetail";

const FeaturedEvent = ({ firstData }) => {
  const moveToDetailPage = useNavigateToDetail();

  if (!firstData) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <EventWrap>
      <Event>
        <InfoBox>
          <h3>진행 중인 이벤트</h3>
          <ViewAllEvent to="/AllEvent">
            <span>
              <IoIosCalendar size={24} />
            </span>
            <p>
              View All Events
              <RxArrowTopRight size={13} style={{ marginLeft: "2px" }} />
            </p>
          </ViewAllEvent>
        </InfoBox>
        <ImgBox onClick={() => moveToDetailPage("0")}>
          <AdBadge>
            <p>AD</p>
          </AdBadge>
          <img src={firstData.MAIN_IMG} alt={firstData.TITLE} />
        </ImgBox>
      </Event>
    </EventWrap>
  );
};

const EventWrap = styled.div`
  display: grid;
  grid-column: 1 / 4;
`;

const Event = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
`;

const InfoBox = styled.div`
  grid-column: 1 / 3;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  padding-bottom: 50px;

  h3 {
    font-size: 35px;
  }
`;

const ViewAllEvent = styled(Link)`
  display: flex;
  color: #000;
  text-decoration: none;
  align-items: center;

  p {
    margin: 0 5px;
  }

  &:hover {
    p {
      border-bottom: 1px solid #000;
      margin-bottom: -1px;
    }
  }
`;

export const ImgBox = styled.div`
  height: 352px;
  border: 2px solid #000;
  margin: -2px -2px 0px 0px;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AdBadge = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  right: 0;
  background-color: #000;

  p {
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
  }
`;

export default FeaturedEvent;
