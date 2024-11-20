import { useState } from "react";
import "./App.css";
import AllEvent from "./components/AllEvent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AllEvent />
    </>
  );
}

export default App;
