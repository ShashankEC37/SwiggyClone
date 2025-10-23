import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import RestaurantDetail from "./pages/RestaurantDetail";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <h1>Swiggy Clone</h1>
          {!isLoggedIn ? (
            <>
              <div className="auth-details">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            </>
          ) : (
            <>
              <div className="auth-details">
                <Link to="/">Home</Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <HomePage /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
