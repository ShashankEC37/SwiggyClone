import { Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="tel" name="phone" placeholder="Phone Number" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
