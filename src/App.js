import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/notfound/NotFound.jsx"; // Adicione uma página 404

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Ensure correct path for Login*/}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {/* Rota para páginas não encontradas */}
      </Routes>
    </Router>
  );
}

export default App;
