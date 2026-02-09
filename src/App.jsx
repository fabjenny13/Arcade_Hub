import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Minesweeper from "./Minesweeper/Minesweeper";
import Pacman from "./pacman/pacman";
import Login from "./Login/Login";
import FlappyBird from "./FlappyBirdMiniGame/FlappyBird";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/minesweeper" element={<Minesweeper />} />
      <Route path="/pacman" element={<Pacman />} />
      <Route path="/login" element={<Login />} />
      <Route path="/flappybird" element={<FlappyBird />} />
    </Routes>
  );
}

export default App;
