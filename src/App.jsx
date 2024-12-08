import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import Home from "./pages/Home";

// 추가
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  // 추가
  // 현재 사용자 상태 저장
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Firebase로부터 현재 사용자 정보 설정
    });
    return () => unsubscribe(); // 컴포넌트가 언마운트되면 구독 해제
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* Layout에 user를 전달, 추가 */}
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Home />} />
=======
        <Route element={<Layout user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/AllEvent" element={<AllEvent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/reservation" element={<ReservationPage />} />

          // 추가
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          </Route>
>>>>>>> Stashed changes
      </Routes>
    </>
  );
}

export default App;
