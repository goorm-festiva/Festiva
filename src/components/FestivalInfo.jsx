import styled from "styled-components";
import { Link } from "react-router-dom";
import { PiArrowUpRightThin } from "react-icons/pi";
import dateFormatter from "../util/dateFormatter";

const titleFormatter = (title) => {
  const index = title.indexOf("]");
  return title.slice(index + 1);
};

const FestivalInfo = ({ info }) => (
  <InfoWrap>
    <div>
      <span>What's On</span>
      <h1>{titleFormatter(info.TITLE)}</h1>
    </div>
    <div>
      <p>{dateFormatter(info.DATE)}</p>
      <p>{info.PLACE}</p>
    </div>
    <LinkDetail to="">
      <PiArrowUpRightThin />
    </LinkDetail>
  </InfoWrap>
);

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

const LinkDetail = styled(Link)`
  position: absolute;
  bottom: -110px;
  right: -90px;
  color: #000;
  font-size: clamp(160px, 20vw, 220px);
`;

export default FestivalInfo;
