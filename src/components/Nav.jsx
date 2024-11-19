import styled from "styled-components";
import SearchBar from "./SearchBar";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Header>
      <TitleLink to={"/"}>Festiva</TitleLink>
      <NavDiv>
        <LinkItem to={"/"}>행사 보기</LinkItem>
        <LinkItem to={"/"}>가이드</LinkItem>
        <LinkItem to={"/"}>하이라이트</LinkItem>
      </NavDiv>
      <IconDiv>
        <SearchBar />
        <LinkItem to={"/"}>
          <FaUserCircle size="24" />
        </LinkItem>
      </IconDiv>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0 3rem;
`;

const NavDiv = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 60px;
`;

const TitleLink = styled(Link)`
  color: white;
  font-size: 24px;
  text-decoration: none;
  font-family: "BlackHansSans-Regular";
`;

const LinkItem = styled(Link)`
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  transition: 0.2s;
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const IconDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
`;

export default Nav;
