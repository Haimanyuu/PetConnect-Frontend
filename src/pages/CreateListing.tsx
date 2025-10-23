import React, { useState, ChangeEvent, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import "./CreateListing.css";

interface PetListing {
    name: string;
    breed: string;
    age: string;
    gender: string;
    duration: string;
    description: string;
    careInstructions: string;
    location: string;
    contactInfo: string;
    photos: File[];
}

export default function CreateListing() {
    const [formData, setFormData] = useState<PetListing>({
        name: "",
        breed: "",
        age: "",
        gender: "",
        duration: "",
        description: "",
        careInstructions: "",
        location: "",
        contactInfo: "",
        photos: [],
    });

    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setFormData((prev) => ({ ...prev, photos: fileArray }));

            const previews = fileArray.map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Pet Listing Data:", formData);
        setFormData({
            name: "",
            breed: "",
            age: "",
            gender: "",
            duration: "",
            description: "",
            careInstructions: "",
            location: "",
            contactInfo: "",
            photos: [],
        });
        setPreviewImages([]);
        alert("Listing created successfully! (Frontend Demo)");
    };

    return (
        <div className="lp-container bg-light">
            <Header />
            <main className="create-main">
                <motion.div
                    className="create-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="create-title">List Your Pet for Fostering</h1>
                    <p className="create-subtitle">
                        Help your pet find a temporary loving home 💕
                    </p>
                </motion.div>

                <form className="create-form card" onSubmit={handleSubmit}>
                    {/* Step 1: Basic Info */}
                    <section className="form-section">
                        <h2 className="form-heading">🐾 Basic Information</h2>
                        <div className="form-grid-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Pet Name *"
                                className="input-field"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="breed"
                                placeholder="Breed"
                                className="input-field"
                                value={formData.breed}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-grid-3">
                            <input
                                type="number"
                                name="age"
                                placeholder="Age (years)"
                                className="input-field"
                                value={formData.age}
                                onChange={handleChange}
                            />
                            <select
                                name="gender"
                                className="input-field"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Gender *</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <select
                                name="duration"
                                className="input-field"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Foster Duration *</option>
                                <option value="short_term">Short Term (1-2 weeks)</option>
                                <option value="medium_term">Medium Term (3-4 weeks)</option>
                                <option value="long_term">Long Term (1+ months)</option>
                            </select>
                        </div>
                    </section>

                    {/* Step 2: Description & Care */}
                    <section className="form-section">
                        <h2 className="form-heading">🩺 Description & Care</h2>
                        <textarea
                            name="description"
                            placeholder="Pet Description *"
                            className="input-field"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="careInstructions"
                            placeholder="Care Instructions"
                            className="input-field"
                            rows={3}
                            value={formData.careInstructions}
                            onChange={handleChange}
                        />
                    </section>

                    {/* Step 3: Location & Contact */}
                    <section className="form-section">
                        <h2 className="form-heading">📍 Location & Contact</h2>
                        <div className="form-grid-2">
                            <input
                                type="text"
                                name="location"
                                placeholder="City / Area *"
                                className="input-field"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="contactInfo"
                                placeholder="Contact Info *"
                                className="input-field"
                                value={formData.contactInfo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </section>

                    {/* Step 4: Upload Photos */}
                    <section className="form-section">
                        <h2 className="form-heading">📸 Upload Photos</h2>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="input-field"
                        />
                        <div className="preview-grid">
                            {previewImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Preview ${index}`}
                                    className="preview-img"
                                />
                            ))}
                        </div>
                    </section>

                    {/* Buttons */}
                    <div className="form-buttons">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Submit Listing
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}
