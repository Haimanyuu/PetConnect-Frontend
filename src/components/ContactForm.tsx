import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactForm.css";

interface ContactFormProps {
    onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        alert("Thank you! Your message has been sent.");
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="modal"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100vh", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                >
                    <h2 className="modal-title">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <div className="form-buttons">
                            <button type="submit" className="btn-primary">Send</button>
                            <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
