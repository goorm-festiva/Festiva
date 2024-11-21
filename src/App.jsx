import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import Home from "./pages/Home";
import AllEvent from "./components/AllEvent";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllEvent" element={<AllEvent />} />
      </Routes>
    </>
  );
}

export default App;
