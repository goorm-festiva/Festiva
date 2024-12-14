// hooks/useNavigateToDetail.js
import { useNavigate } from "react-router-dom";

export const useNavigateToDetail = () => {
  const navigate = useNavigate();

  return (id) => {
    navigate(`/detail/${id}`);
    window.scrollTo(0, 0);
  };
};
