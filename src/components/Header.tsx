import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <span className="logo">🐾 PetConnect</span>
                </div>
                <nav className="header-nav">
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/about")}>About</button>
                    <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
                    <button onClick={() => navigate("/signup")} className="nav-btn-primary">Get Started</button>
                </nav>
            </div>
        </header>

    );
}
