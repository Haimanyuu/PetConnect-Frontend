import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaGoogle, FaApple } from "react-icons/fa";
import "./Signup.css";

export default function Signup() {
    const navigate = useNavigate();

    const handleSendCode = () => {
        navigate("/verify");
    };

    return (
        <div className="signup-page bg-gradient animate-fade-in">
            <Header />

            <main className="signup-main">
                <div className="signup-card animate-slide-down">
                    <h2 className="title">Create Account</h2>
                    <p className="subtitle">Sign up to start connecting with pets and shelters.</p>

                    {/* Email / Phone Input */}
                    <input
                        type="text"
                        placeholder="Email or Phone"
                        className="input-field"
                    />

                    {/* Send OTP Button */}
                    <button onClick={handleSendCode} className="btn-primary">
                        Send Verification Code
                    </button>

                    {/* Or Divider */}
                    <div className="divider">
                        <span>or</span>
                    </div>

                    {/* Google & Apple Buttons */}
                    <div className="btn-group">
                        <button className="btn google-btn">
                            <FaGoogle /> Continue with Google
                        </button>
                        <button className="btn apple-btn">
                            <FaApple /> Continue with Apple
                        </button>
                    </div>

                    {/* Terms & Privacy */}
                    <p className="terms-text">
                        By signing up, you agree to our{" "}
                        <a href="#">Terms</a> & <a href="#">Privacy Policy</a>.
                    </p>

                    <p className="login-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
