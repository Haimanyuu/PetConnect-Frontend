import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // TODO: Add validation or API call here if needed
    navigate("/matches");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email or Phone"
        style={{
          display: "block",
          margin: "1rem auto",
          padding: "0.5rem",
          width: "80%",
          maxWidth: "300px",
        }}
      />
      <button
        onClick={handleContinue}
        style={{
          margin: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Continue
      </button>
      <br />
      <button
        style={{
          margin: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f1f1f1",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
      <br />
      <button
        style={{
          margin: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f1f1f1",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Continue with Apple
      </button>
      <p style={{ marginTop: "1rem" }}>
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
