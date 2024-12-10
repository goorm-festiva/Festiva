import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import Home from "./pages/Home";
import AllEvent from "./pages/AllEvent";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import ReservationPage from "./pages/ReservationPage";
import Layout from "./components/Layout";

import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// 추가
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  // 현재 사용자 상태 저장
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser); // 사용자 정보를 로그로 확인
      setUser(currentUser); // Firebase로부터 현재 사용자 정보 설정
    });
    return () => unsubscribe(); // 컴포넌트가 언마운트되면 구독 해제
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* Layout에 user를 전달 */}
      <Routes>
        <Route element={<Layout user={user} />}>
          {/* 비로그인 사용자가 접근 가능한 페이지 */}
          <Route path="/" element={<Home />} />
          <Route path="/AllEvent" element={<AllEvent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 로그인 사용자만 접근 가능한 페이지 */}
          <Route
            path="/mypage"
            element={
              <ProtectedRoute user={user}>
                <MyPage />
              </ProtectedRoute>
            }
          />

          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
 
        </Route>
      </Routes>
    </>
  );
}

export default App;
