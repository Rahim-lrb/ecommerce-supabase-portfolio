import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // For Phone and Email Icons

export default function Contact() {
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
                    <form>
                        {/* Name, Email, Phone on the same line */}
                        <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
                            <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
                                <input
                                    type="text"
                                    id="name"
                                    className="px-4 py-4 bg-[#F5F5F5] rounded-md text-primary"
                                    placeholder="Your Name*"
                                    required
                                />
                            </div>

                            <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
                                <input
                                    type="email"
                                    id="email"
                                    className="px-4 py-4 bg-[#F5F5F5] rounded-md text-primary"
                                    placeholder="Your Email*"
                                    required
                                />
                            </div>

                            <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
                                <input
                                    type="tel"
                                    id="phone"
                                    className="px-4 py-4 bg-[#F5F5F5] rounded-md text-primary"
                                    placeholder="Your Phone*"
                                    required
                                />
                            </div>
                        </div>

                        {/* Message Textarea */}
                        <div className="mb-6">
                            <textarea
                                id="message"
                                rows="8"
                                className="w-full px-4 py-4 bg-[#F5F5F5] rounded-md text-primary"
                                placeholder="Your Message*"
                                required
                            ></textarea>
                        </div>

                        {/* Send Button */}
                        <div className="flex justify-center sm:justify-end">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
