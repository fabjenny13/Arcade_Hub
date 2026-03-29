import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Minesweeper from "./Minesweeper/Minesweeper";
import Profile from "./Pages/Profile";
import Pacman from "./pacman/pacman";
import Login from "./Pages/Login";
import FlappyBird from "./FlappyBird/FlappyBird";
import Friends from "./Pages/Friends";
import Snake from "./Snake/Snake";
import TicTacToe from "./MultiplayerGames/TicTacToe";
import SimpleShooter from "./MultiplayerGames/SimpleShooter";
import ConnectFour from "./MultiplayerGames/ConnectFour";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/minesweeper" element={<Minesweeper />} />
      <Route path="/pacman" element={<Pacman />} />
      <Route path="/login" element={<Login />} />
      <Route path="/flappybird" element={<FlappyBird />} />
      <Route path="/snake" element={<Snake />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/simpleshooter" element={<SimpleShooter />} />
      <Route path="/connectfour" element={<ConnectFour />} />
    </Routes>
  );
}

export default App;
