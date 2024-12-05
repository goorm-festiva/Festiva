import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import Home from "./pages/Home";
import AllEvent from "./pages/AllEvent";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import ReservationPage from "./pages/ReservationPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/AllEvent" element={<AllEvent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
