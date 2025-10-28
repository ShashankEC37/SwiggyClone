import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import RestaurantDetail from "./pages/RestaurantDetail";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import "./App.css";
import { useCart } from "./context/CartContext";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";

function AppContent() {
  const { user, logout: logoutUser, loading } = useUser();
  const { getTotalItems } = useCart();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  // Hide navigation on landing page, login, and signup
  const showNavigation =
    !["/login", "/signup", "/"].includes(location.pathname) ||
    (location.pathname === "/" && user);

  return (
    <div className="app">
      {showNavigation && (
        <nav className="app-nav">
          <h1>Swiggy Clone</h1>
          {!user ? (
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
                <Link to="/orders">My Orders</Link>
                <Link to="/cart" className="cart-link">
                  🛒 Cart ({getTotalItems()})
                </Link>
                <span className="user-name">👤 {user?.name || "User"}</span>
                <button
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      )}

      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
