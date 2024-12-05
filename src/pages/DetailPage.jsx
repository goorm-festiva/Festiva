import { useLocation, useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { DATE, MAIN_IMG, TITLE } = { ...location.state };

  return (
    <>
      <p>{id}번 페이지</p>
      <p>{DATE}</p>
      <img src={MAIN_IMG} alt={TITLE}></img>
      <p>{TITLE}</p>
    </>
  );
};

export default DetailPage;
