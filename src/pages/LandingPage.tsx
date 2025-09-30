import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaw, FaHeart, FaCalendarAlt, FaDog, FaCat, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./LandingPage.css";


export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="lp-container">
            <Header navigate={navigate} />
            <main className="lp-main">
                <div className="hero-section">
                    <div className="hero-text">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Find your perfect pet companion
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                        >
                            Adopt, foster, or connect with shelters — all in one place.
                        </motion.p>
                        <div className="hero-buttons">
                            <button className="btn-primary" onClick={() => navigate("/signup")}>
                                Get Started
                            </button>
                            <button className="btn-secondary" onClick={() => navigate("/browse")}>
                                Browse Pets
                            </button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <motion.img
                            src="/images/AdobeStock.jpeg"
                            alt="Cat & Dog"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                    </div>

                </div>

                <section className="stats-section">
                    <div className="stat-card">
                        <FaDog className="stat-icon" />
                        <div className="stat-value">2,400+</div>
                        <div className="stat-label">Pets listed</div>
                    </div>
                    <div className="stat-card">
                        <FaHeart className="stat-icon" />
                        <div className="stat-value">1,100+</div>
                        <div className="stat-label">Adoptions</div>
                    </div>
                    <div className="stat-card">
                        <FaCat className="stat-icon" />
                        <div className="stat-value">350+</div>
                        <div className="stat-label">Active fosters</div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="feature-card">
                        <FaPaw className="feature-icon" />
                        <h3>Smart Matching</h3>
                        <p>Find pets based on your lifestyle and preferences.</p>
                    </div>
                    <div className="feature-card">
                        <FaHeart className="feature-icon" />
                        <h3>Foster Tools</h3>
                        <p>Organize workflows with reminders and approvals.</p>
                    </div>
                    <div className="feature-card">
                        <FaCalendarAlt className="feature-icon" />
                        <h3>Care Planner</h3>
                        <p>Track vaccinations, meds, and vet visits easily.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function Header({ navigate }: { navigate: (path: string) => void }) {
    return (
        <header className="lp-header">
            <div className="header-left">
                <span className="logo">🐾 PetConnect</span>
            </div>
            <nav className="header-nav">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/about")}>About</button>
                <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
                <button onClick={() => navigate("/signup")} className="nav-btn-primary">Get Started</button>
            </nav>
        </header>
    );
}

function Footer() {
    return (
        <footer className="lp-footer">
            <div className="footer-top">
                <div>
                    <span className="logo">🐾 PetConnect</span>
                    <p>Connecting Hearts. One Paw at a Time.</p>
                </div>
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/faq">FAQ</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="footer-socials">
                    <FaFacebook />
                    <FaTwitter />
                    <FaInstagram />
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} PetConnect. All rights reserved.
            </div>
        </footer>
    );
}
