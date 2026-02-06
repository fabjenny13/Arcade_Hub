import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Minesweeper from "./Minesweeper/Minesweeper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/minesweeper" element={<Minesweeper />} />
    </Routes>
  );
}

export default App;
