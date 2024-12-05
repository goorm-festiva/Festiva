import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFestivalStore } from "../store/festivalStore";

const DetailPage = () => {
  const { id } = useParams();
  const { festivalData, fetchFestivalData } = useFestivalStore();

  // 데이터가 없으면 fetch 요청
  useEffect(() => {
    if (!festivalData) {
      fetchFestivalData("축제", 1, 10);
    }
  }, [festivalData, fetchFestivalData]);

  if (!festivalData || !festivalData[id]) {
    return <p>Loading data...</p>;
  }

  const { DATE, MAIN_IMG, TITLE } = festivalData[id];

  return (
    <>
      <p>{id}번 페이지</p>
      <p>{DATE}</p>
      <img src={MAIN_IMG} alt={TITLE} />
      <p>{TITLE}</p>
    </>
  );
};

export default DetailPage;
