import React from "react";
import { Link } from "react-router-dom";

const AllEventNav = () => {
  return (
    <nav>
      <Link to="/">Home</Link> &gt; {/* '>' 기호로 구분 */}
      <Link to="/AllEvent">행사 일정</Link> {/* AllEvent 페이지 링크 */}
    </nav>
  );
};

export default AllEventNav;
