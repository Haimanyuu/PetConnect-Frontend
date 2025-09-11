import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Here you would call your backend API to verify OTP
    navigate("/intent");
  };

  const handleResend = () => {
    alert("OTP resent successfully!");
  };

  return (
    <div className="app-container bg-gradient animate-fade-in">
      <div className="card animate-slide-down">
        <h2 className="title">Enter Verification Code</h2>
        <p className="subtitle">
          OTP sent to <strong>user@email.com</strong>
        </p>

        {/* OTP Input */}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="input-field"
        />

        {/* Verify Button */}
        <button onClick={handleVerify} className="btn btn-primary">
          Verify
        </button>

        {/* Resend OTP */}
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "1rem" }}>
          Didn’t get the code?{" "}
          <button
            onClick={handleResend}
            style={{
              background: "none",
              border: "none",
              color: "#4F46E5",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Resend OTP (30s)
          </button>
        </p>
      </div>
    </div>
  );
}

export default OtpVerification;
