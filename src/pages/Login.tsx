import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    // Add validation or API call here if needed
    navigate("/verify");
  };

  return (
    <div className="app-container bg-gradient animate-fade-in">
      <div className="card animate-slide-down">
        <h2 className="title">Login</h2>
        <p className="subtitle">Enter your email or phone number to continue</p>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or Phone"
          className="input-field"
        />

        <button onClick={handleContinue} className="btn btn-primary">
          Continue
        </button>

        <div className="btn-group" style={{ marginTop: "1rem" }}>
          <button className="btn btn-secondary">Continue with Google</button>
          <button className="btn btn-secondary">Continue with Apple</button>
        </div>

        <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "1rem" }}>
          Don’t have an account? <a href="/signup" style={{ color: "#4F46E5" }}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
