import Login from "./pages/Login";
import { Routes, Route, } from "react-router-dom";
import Signup from "./pages/Signup";
import SignupForm from "./pages/SignupForm";
import MoaZone from "./pages/Moa/MoaZone";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signupform" element={<SignupForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/moazone" element={<MoaZone />} />
    </Routes>
  );
}

export default App;
