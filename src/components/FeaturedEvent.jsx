import { IoIosCalendar } from "react-icons/io";
import { RxArrowTopRight } from "react-icons/rx";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FeaturedEvent = ({ firstData }) => {
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
        <ImgBox>
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

const ImgBox = styled.div`
  height: 352px;
  border: 2px solid #000;
  margin: -2px -2px 0px 0px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default FeaturedEvent;
