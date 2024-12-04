import { useLocation, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { DATE, MAIN_IMG, TITLE } = { ...location.state };

  return (
    <>
      <Nav />
      <p>{id}번 페이지</p>
      <p>{DATE}</p>
      <img src={MAIN_IMG} alt={TITLE}></img>
      <p>{TITLE}</p>
      <Footer />
    </>
  );
};

export default DetailPage;
