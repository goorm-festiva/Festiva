import React from "react";
import styled from "styled-components";

const Nav = () => {
  return (
    <Header>
      <div>Festiva</div>
      <div>행사 보기</div>
      <div>검색하기 / 마이페이지</div>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  max-width: 113.5rem;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0 3rem;
  box-sizing: border-box;
  gap: 30px;
  margin: 0;
`;

export default Nav;
