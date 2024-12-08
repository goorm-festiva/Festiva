import styled from "styled-components";
import SearchBar from "./SearchBar";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

// 추가
import { getAuth } from "firebase/auth"; // Firebase 인증 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 추가


// 추가
// user props 받기
const Nav = ({ user }) => {
  // 추가
  const auth = getAuth(); // Firebase 인증 객체
  const navigate = useNavigate(); // 리다이렉트를 위한 useNavigate 훅

  // 로그아웃 함수
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        alert("로그아웃되었습니다!"); // 알림 메시지
        navigate("/login"); // 로그인 페이지로 리다이렉트
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
        alert("로그아웃에 실패했습니다. 다시 시도해주세요."); // 에러 메시지
      });
  };

  return (
    <Header>
      <NavWrap>
        <TitleLink to={"/"}>Festiva</TitleLink>
        <NavDiv>
          <LinkItem to={"/AllEvent"}>행사 보기</LinkItem>
          <LinkItem to={"/"}>가이드</LinkItem>
          <LinkItem to={"/"}>하이라이트</LinkItem>
        </NavDiv>
        <IconDiv>
          <SearchBar />
          {/* <LinkItem to={"/login"}>
            <FaUserCircle size="24" />
          </LinkItem> */}
          {/* 추가 */}
          {user ? ( // user가 존재하면 로그아웃 버튼 표시
            <>
              <LinkItem to={"/profile"}>
                <FaUserCircle size="24" />
              </LinkItem>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <LinkItem to={"/login"}>
              <FaUserCircle size="24" />
            </LinkItem>
          )}
        </IconDiv>
      </NavWrap>
    </Header>
  );
};


// 로그아웃 버튼 추가
const LogoutButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

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
