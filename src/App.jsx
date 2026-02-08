import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Minesweeper from "./Minesweeper/Minesweeper";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/minesweeper" element={<Minesweeper />} />
    </Routes>
  );
}

export default App;
