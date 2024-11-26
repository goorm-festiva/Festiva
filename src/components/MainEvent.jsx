import MainEventItem from "./MainEventItem";
import { IoIosCalendar } from "react-icons/io";
import { RxArrowTopRight } from "react-icons/rx";
import { useFestivalStore } from "../store/festivalStore";
import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MainEvent = () => {
  const { festivalData, isLoading, fetchFestivalData } = useFestivalStore();

  //데이터 패치
  useEffect(() => {
    fetchFestivalData("축제", 1, 10);
  }, [fetchFestivalData]);

  //isLoading: 이미지를 불러오기 전에는 map이 실행되지 않도록 함
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  const [firstData, ...remainingData] = festivalData;

  return (
    <Container>
      <FeaturedEventWrap>
        <FeaturedEvent>
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
        </FeaturedEvent>
      </FeaturedEventWrap>
      {remainingData.map((data, index) => (
        <MainEventItem key={index} data={data} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 350px;
  margin: 0 auto;
  padding: 20px 50px;
  max-width: 1200px;
`;

const FeaturedEventWrap = styled.div`
  display: grid;
  grid-column: 1 / 4;
`;

const FeaturedEvent = styled.div`
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

export default MainEvent;
