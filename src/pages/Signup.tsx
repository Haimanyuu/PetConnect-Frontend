import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSendCode = () => {
    navigate("/verify");
  };

  return (
    <div className="app-container bg-gradient animate-fade-in">
      <div className="card animate-slide-down">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Sign up to start connecting with pets and shelters.</p>

        {/* Email / Phone Input */}
        <input
          type="text"
          placeholder="Email or Phone"
          className="input-field"
        />

        {/* Send OTP Button */}
        <button onClick={handleSendCode} className="btn btn-primary">
          Send Verification Code
        </button>

        {/* Terms & Privacy */}
        <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "1rem" }}>
          By signing up, you agree to our <a href="#" style={{ color: "#4F46E5", fontWeight: "600" }}>Terms</a> & <a href="#" style={{ color: "#4F46E5", fontWeight: "600" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Signup;
