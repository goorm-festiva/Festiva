import { useNavigate } from "react-router-dom";

export const useNavigatePage = () => {
  const navigate = useNavigate();

  return (link) => {
    navigate(link);
    window.scrollTo(0, 0);
  };
};
