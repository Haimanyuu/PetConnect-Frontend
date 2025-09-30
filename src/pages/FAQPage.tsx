import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQPage.css";

export default function FAQPage() {
    const faqs = [
        { q: "How do I adopt a pet?", a: "Browse available pets, click on a profile, and fill the adoption form." },
        { q: "Can I foster temporarily?", a: "Yes, we provide tools and approval processes for temporary fostering." },
        { q: "Is there a fee to adopt?", a: "Adoption fees vary depending on the shelter. Many pets are available at no cost." },
        { q: "How do I volunteer?", a: "Create an account and connect with shelters in your area to get started." },
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <Header />
            <main className="faq-main">
                <motion.h1
                    className="faq-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Frequently Asked Questions
                </motion.h1>

                <section className="faq-list">
                    {faqs.map((item, index) => (
                        <div key={index} className={`faq-card ${activeIndex === index ? "active" : ""}`}>
                            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                <h3>{item.q}</h3>
                                <span>{activeIndex === index ? "-" : "+"}</span>
                            </div>

                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        className="faq-answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="faq-answer-content">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
}
