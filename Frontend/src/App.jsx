import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Swiggy Clone</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
