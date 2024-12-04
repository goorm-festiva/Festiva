//날짜 포맷 변경
const dateFormatter = (DATE) => {
  if (!DATE) return "Invalid Date"; // DATE가 없을 경우 처리
  const newDate = DATE.replaceAll("-", ".").replaceAll("~", " ~ ");
  return newDate;
};

export default dateFormatter;
