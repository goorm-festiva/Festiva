import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import styled from "styled-components";

// 컨테이너 스타일
const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 30px;
`;

// 페이지 헤더
const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 100px;

  // 색상을 왼쪽(#ff7f50, 주황)에서 오른쪽(#32cd32, 연두색)으로 자연스럽게 변하게 함
  background: linear-gradient(90deg, #ff7f50, #1e90ff, #32cd32);
  // 그라데이션을 텍스트에만 적용하도록 설정
  -webkit-background-clip: text;
  // 텍스트를 투명하게 만들어 배경 그라데이션이 보이도록
  -webkit-text-fill-color: transparent;

  h1 {
    font-size: 3.0rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

// 카드 레이아웃
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

// 개별 카드 스타일
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;

  h2 {
    font-size: 1.5rem;
    color: #444;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    line-height: 1.5;
  }

  button {
    margin-top: 10px;
    padding: 10px 15px;
    background: #0078d4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #005fa3;
    }
  }
`;

// 마이페이지 컴포넌트
const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUserInfo({
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL || "https://via.placeholder.com/150", // 기본 프로필 이미지
            });

            const wishlistDoc = await getDoc(doc(db, "wishlists", user.uid));
            setWishlist(wishlistDoc.exists() ? wishlistDoc.data().items : []);
          } else {
            setError("로그인이 필요합니다.");
          }
        });
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth, db]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container>
      {/* 페이지 헤더 */}
      <PageHeader>
        <h1>Festiva MyPage</h1>
        <p>사용자 정보를 확인하고 활동 내역을 관리하세요.</p>
      </PageHeader>

      <CardGrid>
        {/* userInfo가 초기화되지 않았을 때 렌더링을 건너뛰도록
            조건부 렌더링을 더 명확히 수정 
            userInfo가 존재할 때만 렌더링이 진행 */}
        {userInfo ? (
          // 사용자 정보 카드
          <Card>
            <h2>👤 내 정보</h2>
            <img
              // 에러 1 ) 
              // onAuthStateChanged에서
              // 사용자를 가져오는 동안 userInfo 상태가 아직 초기화되지 않았기 때문
              // 즉, userInfo가 null인 상태에서
              // userInfo.photoURL을 읽으려고 해서 발생하는 에러
              src={userInfo.photoURL || "https://via.placeholder.com/150"}
              alt="프로필 사진"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p>이름 : {userInfo.name}</p>
            <p>이메일 : {userInfo.email}</p>
          </Card>
        ) : (
          // userInfo가 null일 경우
          // <p>사용자 정보를 불러오는 중입니다...</p>로 대체
          <p>사용자 정보를 불러오는 중입니다...</p>
        )}

        {/* 찜한 목록 카드 */}
        <Card>
          <h2>❤️찜한 목록❤️</h2>
          {wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <p key={index}>
                <strong>{item.title}</strong>
              </p>
            ))
          ) : (
            <p>찜한 항목이 없습니다.</p>
          )}
        </Card>

        {/* 최근 본 항목 카드 */}
        <Card>
          <h2>👀 최근 본 항목</h2>
          <p>이 기능은 아직 준비 중입니다.</p>
        </Card>
      </CardGrid>
    </Container>
  );
};

export default MyPage;