import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginAPI } from "../services/api";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const data = await loginAPI(credentials);

      console.log("Login successful:", data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="auth-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
