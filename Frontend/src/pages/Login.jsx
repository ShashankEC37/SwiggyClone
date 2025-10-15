import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
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
