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



// // React와 필요한 훅(useState, useEffect)을 가져옴
// import React, { useState, useEffect } from "react";

// // Firebase에서 사용자 정보 가져오기 및 업데이트, 인증 관련 함수 가져오기
// import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth"; 
// import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; 

// // styled-components로 스타일을 작성하기 위해 가져옴
// import styled from "styled-components";

// // styled-components로 MyPage 컨테이너 스타일 정의
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   max-width: 800px;
//   margin: 0 auto;
//   background-color: #f9f9f9;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// // 제목 스타일 정의
// const Header = styled.h1`
//   font-size: 2.5rem;
//   margin-bottom: 20px;
//   color: #333;
// `;

// // 사용자 정보 섹션 스타일 정의
// const Section = styled.div`
//   width: 100%;
//   margin-bottom: 20px;
//   padding: 20px;
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// // '찜한 목록' 스타일 정의
// const ItemList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// // 개별 항목 스타일 정의
// const Item = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 10px;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// // '마이페이지' 컴포넌트
// const MyPage = () => {
//   // 사용자 정보를 저장하는 상태
//   // 에러 1 ) Uncaught TypeError: Cannot read properties of null
//     // (reading 'name') 에러가 여전히 발생한다면
//     // userInfo의 초기 상태를 보다 명확하게 정의하고,
//     // 해당 상태에 접근할 때 조건부 렌더링을 철저히 적용
//     // userInfo가 null이거나 아직 초기화되지 않은 상태에서
//     // userInfo.name에 접근하려고 시도하기 때문에 발생
//   // 초기값 설정
//   const [userInfo, setUserInfo] = useState({ name: "", email: "" });
//   // 사용자가 찜한 항목들을 저장하는 상태
//   const [wishlist, setWishlist] = useState([]);
//   // 로딩 상태를 나타냄
//   const [loading, setLoading] = useState(true);
//   // 에러 메시지 상태
//   const [error, setError] = useState("");

//   // Firebase 인증 객체 생성
//   const auth = getAuth();
//   // Firebase Firestore 객체 생성
//   const db = getFirestore();

//   // 컴포넌트가 처음 렌더링될 때 사용자 정보와 찜한 목록을 불러옴
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true); // 로딩 시작
//       try {
//         // 현재 로그인된 사용자를 가져옴
//         onAuthStateChanged(auth, async (user) => {
//           if (user) {
//             // 사용자 정보를 상태에 저장
//             setUserInfo({
//               name: user.displayName || "이름 없음", // 기본값 설정
//               email: user.email || "이메일 없음",
//             });

//             // Firestore에서 찜한 목록 가져오기
//             const wishlistDoc = await getDoc(doc(db, "wishlists", user.uid));
//             if (wishlistDoc.exists()) {
//               setWishlist(wishlistDoc.data().items); // 찜한 항목 상태에 저장
//             } else {
//               setWishlist([]); // 찜한 목록이 없을 경우 빈 배열로 설정
//             }
//           } else {
//             setError("로그인이 필요합니다.");
//           }
//         });
//       } catch (err) {
//         console.error("데이터 불러오기 실패:", err);
//         setError("데이터를 불러오는 중 문제가 발생했습니다.");
//       } finally {
//         setLoading(false); // 로딩 종료
//       }
//     };

//     fetchUserData(); // 사용자 데이터 불러오기 호출
//   }, [auth, db]);

//   // 사용자 정보 업데이트 함수
//   const handleUpdate = async () => {
//     if (!userInfo.name.trim()) {
//       setError("이름은 비워둘 수 없습니다.");
//       return;
//     }
//     try {
//       // Firebase 인증에서 사용자 이름 업데이트
//       await updateProfile(auth.currentUser, { displayName: userInfo.name });

//       // Firestore에서 사용자 정보 업데이트
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         name: userInfo.name,
//       });

//       setError("");
//       alert("사용자 정보가 업데이트되었습니다!");
//     } catch (err) {
//       console.error("정보 업데이트 실패:", err);
//       setError("사용자 정보를 업데이트하는 중 문제가 발생했습니다.");
//     }
//   };

//   // 로딩 중일 때 로딩 메시지 표시
//   if (loading) return <p>로딩 중...</p>;

//   // 에러가 있을 경우 에러 메시지 표시
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <Container>
//       <Header>Festiva MyPage</Header>

//       {/* 사용자 정보 섹션 */}
//       <Section>
//         <h2>나의 정보</h2>
//         <p>
//           이름:{" "}
//           <input
//             type="text"
//             value={userInfo.name}  // userInfo.name에 안전하게 접근
//             onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
//           />
//         </p>
//         <p>이메일: {userInfo.email}</p>
//         <button onClick={handleUpdate}>정보 수정</button>
//       </Section>

//       {/* 찜한 목록 섹션 */}
//       <Section>
//         <h2>찜한 목록</h2>

//         <ItemList>
//           {wishlist.length > 0 ? (
//             wishlist.map((item, index) => (
//               <Item key={index}>
//                 <img src={item.image} alt={item.title} width="50" />
//                 <p>{item.title}</p>
//               </Item>
//             ))
//           ) : (
//             <p>찜한 항목이 없습니다.</p>
//           )}
//         </ItemList>
//       </Section>
//     </Container>
//   );
// };

// export default MyPage;
