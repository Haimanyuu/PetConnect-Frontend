import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaUsers, FaHandsHelping, FaPaw } from "react-icons/fa";
import "./AboutUsPage.css";

export default function AboutUsPage() {
    return (
        <div className="aboutus-container">
            <Header />

            <main className="aboutus-main">
                {/* Hero Section */}
                <div className="aboutus-hero">
                    <motion.h1
                        className="text-outline"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        About PetConnect
                    </motion.h1>
                    <motion.p
                        className="text-outline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        We believe every pet deserves a loving home. PetConnect is designed to bridge
                        the gap between shelters, fosters, and passionate pet adopters.
                    </motion.p>
                </div>

                {/* Mission & Values Section */}
                <section className="aboutus-values">
                    <motion.div
                        className="value-card"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaUsers className="value-icon" />
                        <h3>Community Driven</h3>
                        <p>Building a network of animal lovers to strengthen adoption and foster programs.</p>
                    </motion.div>

                    <motion.div
                        className="value-card"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaHandsHelping className="value-icon" />
                        <h3>Support & Care</h3>
                        <p>Providing tools for shelters and fosters to make animal care easy and efficient.</p>
                    </motion.div>

                    <motion.div
                        className="value-card"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaPaw className="value-icon" />
                        <h3>Happy Pets</h3>
                        <p>Prioritizing the happiness, safety, and well-being of every animal we serve.</p>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
