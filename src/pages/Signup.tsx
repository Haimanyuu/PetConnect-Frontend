import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();

  const handleSendCode = () => {
    // later you could add validation / API call here
    navigate("/verify"); // go to OTP verification page
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Create Account</h2>
      <input
        type="text"
        placeholder="Email or Phone"
        style={{ display: "block", margin: "1rem auto", padding: "0.5rem" }}
      />
      <button
        style={{ padding: "0.5rem 1rem" }}
        onClick={handleSendCode}
      >
        Send Verification Code
      </button>
      <p style={{ marginTop: "1rem" }}>
        By signing up, you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
}

export default Signup;
