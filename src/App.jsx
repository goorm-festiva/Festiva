import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import Home from "./pages/Home";
import AllEvent from "./pages/AllEvent";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllEvent" element={<AllEvent />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
