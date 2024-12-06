import styled from "styled-components";
import { PiArrowUpRightThin } from "react-icons/pi";
import dateFormatter from "../util/dateFormatter";
import { useNavigateToDetail } from "../hooks/useNavigateToDetail";

const titleFormatter = (title) => {
  const index = title.indexOf("]");
  return title.slice(index + 1);
};

const FestivalInfo = ({ info, index }) => {
  const moveToDetailPage = useNavigateToDetail();

  return (
    <InfoWrap>
      <div>
        <span>What's On</span>
        <h1>{titleFormatter(info.TITLE)}</h1>
      </div>
      <div>
        <p>{dateFormatter(info.DATE)}</p>
        <p>{info.PLACE}</p>
      </div>
      <MoveDetail>
        <PiArrowUpRightThin onClick={() => moveToDetailPage(index)} />
      </MoveDetail>
    </InfoWrap>
  );
};

const InfoWrap = styled.div`
  width: 55.5%;
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

const MoveDetail = styled.div`
  position: absolute;
  bottom: -60px;
  right: -90px;
  svg {
    color: #000;
    font-size: clamp(160px, 20vw, 240px);
    cursor: pointer;
  }
`;

export default FestivalInfo;
