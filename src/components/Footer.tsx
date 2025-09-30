import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";
import ContactForm from "./ContactForm";

export default function Footer() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <div>
                            <span className="logo">🐾 PetConnect</span>
                            <p>Connecting Hearts. One Paw at a Time.</p>
                        </div>
                        <div className="footer-links">
                            <a href="/about">About Us</a>
                            <a href="/faq">FAQ</a>
                            <button className="footer-contact-btn" onClick={() => setShowForm(true)}>
                                Contact
                            </button>
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
                </div>
            </footer>

            {showForm && <ContactForm onClose={() => setShowForm(false)} />}
        </>
    );
}
