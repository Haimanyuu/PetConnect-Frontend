import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaPaw, FaGoogle, FaApple } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    navigate("/verify");
  };

  return (
    <div className="login-page bg-gradient">
      <Header />
      <main className="login-main">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="title">Welcome Back</h2>
          <p className="subtitle">Login to continue your pet journey</p>

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

          <div className="btn-group">
                    <button className="btn btn-secondary google-btn">
                        <FaGoogle /> Continue with Google
                    </button>
                    <button className="btn btn-secondary apple-btn">
                        <FaApple /> Continue with Apple
                    </button>
                </div>

          <p className="login-footer-text">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </motion.div>

        <motion.div
          className="login-illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/Login.jpeg"
            alt="Happy Pet"
            className="login-img"
          />
        </motion.div>

        <FaPaw className="paw paw-1" />
        <FaPaw className="paw paw-2" />
        <FaPaw className="paw paw-3" />
      </main>
      <Footer />
    </div>
  );
}
