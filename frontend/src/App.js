
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupForm from "./pages/SignupForm";
import GameMoa from "./pages/game/GameMoa";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signupform" element={<SignupForm />} />
      <Route path="/login" element={ <Login/> } />
      <Route path="/gamemoa" element={ <GameMoa/> } />
    </Routes>
  );
}

export default App;
