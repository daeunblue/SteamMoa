//import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import SignupForm from "./pages/SignupForm";
//import SignupForm from "./pages/SignupForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signupform" element={<SignupForm />} />
    </Routes>
  );
}

export default App;
