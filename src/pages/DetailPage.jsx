import { useParams } from "react-router-dom";

const DetailPage = () => {
  const params = useParams();
  return <div>{params.id}번 페이지</div>;
};

export default DetailPage;
