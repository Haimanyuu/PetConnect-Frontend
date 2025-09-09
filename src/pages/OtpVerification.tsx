import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const navigate = useNavigate();

  const handleVerify = () => {
    // later you could check OTP via backend
    navigate("/intent"); // go to matches page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Verification Code</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          OTP sent to <strong>user@email.com</strong>
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded mb-2"
          onClick={handleVerify}
        >
          Verify
        </button>
        <p className="text-sm text-gray-500 text-center">
          Didn’t get the code? <a href="#" className="text-blue-500">Resend OTP (30s)</a>
        </p>
      </div>
    </div>
  );
}

export default OtpVerification;
