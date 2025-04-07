import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);

        try {
            const response = await fetch("https://vubxtablrvxzvhmpcsey.supabase.co/functions/v1/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess("Message sent successfully!");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setSuccess(`Error: ${result.error || "Failed to send message"}`);
            }
        } catch (error) {
            setSuccess("Error: Unable to send message");
        }

        setLoading(false);
    };

    return (
        <div className="px-6 lg:px-26 py-16">
            <div className="flex flex-col lg:flex-row space-x-4 items-center">
                {/* Left Side */}
                <div className="flex flex-col justify-start w-full lg:w-1/3 mb-8 lg:mb-0 pr-8">
                    <div className="flex items-center mb-6">
                        <div className="bg-primary text-white p-4 rounded-full">
                            <FaPhoneAlt className="w-6 h-6" />
                        </div>
                        <p className="ml-4 text-lg font-semibold text-black/80">Call Us</p>
                    </div>

                    <p className="text-base text-gray-700 mb-4">Available 24/7, 7 days a week</p>
                    <p className="text-base text-gray-700 mb-4">Phone: +213...</p>

                    <hr className="border-gray-300 mb-6" />

                    <div className="flex items-center mb-6">
                        <div className="bg-primary text-white p-4 rounded-full">
                            <FaEnvelope className="w-6 h-6" />
                        </div>
                        <p className="ml-4 text-lg font-semibold text-black/80">Write to Us</p>
                    </div>

                    <p className="text-base text-gray-700 mb-4">
                        Fill out our form, and we will contact you within 24 hours.
                    </p>
                    <p className="text-base text-gray-700 mb-4">Email: customer@gmail.com</p>
                    <p className="text-base text-gray-700 mb-4">Support Email: support@gmail.com</p>
                </div>

                {/* Right Side (Form) */}
                <div className="flex flex-col w-full lg:w-2/3">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="px-4 py-4 bg-[#F5F5F5] rounded-md text-primary w-full sm:w-1/3 mb-4 sm:mb-0"
                                placeholder="Your Name*"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="px-4 py-4 bg-[#F5F5F5] rounded-md text-primary w-full sm:w-1/3 mb-4 sm:mb-0"
                                placeholder="Your Email*"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="px-4 py-4 bg-[#F5F5F5] rounded-md text-primary w-full sm:w-1/3 mb-4 sm:mb-0"
                                placeholder="Your Phone*"
                                required
                            />
                        </div>

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="8"
                            className="w-full px-4 py-4 bg-[#F5F5F5] rounded-md text-primary mb-6"
                            placeholder="Your Message*"
                            required
                        ></textarea>

                        <div className="flex justify-center sm:justify-end">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </div>

                        {success && (
                            <p className={`mt-4 text-center ${success.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                                {success}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
