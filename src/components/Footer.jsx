import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/Logo.png";
import qrCodeImg from "../assets/Qr Code.png";
import googlePlay from "../assets/googleplay.png";
import appStore from "../assets/appstore.png";
import { Send } from "lucide-react";

export default function Footer() {
    return (
        <div className="bg-black text-white">
            <div className="py-8 sm:py-16 px-6 md:px-12 lg:px-26">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    
                    {/* First Column */}
                    <div>
                        <h2 className="text-xl font-medium text-white mb-4">Exclusive</h2>
                        <p className="text-gray-400 text-sm mb-4">Subscribe and get 10% off your first order!</p>
                        <div className="relative w-full max-w-xs">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="p-2 w-full text-white rounded-lg border border-white bg-transparent outline-none pr-10"
                            />
                            <Send className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Second Column (Support) */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Support</h3>
                        <p className="text-gray-400 text-sm mb-2">Location: 1234 Benimessous, Algiers</p>
                        <p className="text-gray-400 text-sm mb-2">Email: aberrahimcoder@gmail.com</p>
                        <p className="text-gray-400 text-sm mb-2">Phone: +213 556 258 82</p>
                    </div>

                    {/* Third Column (Account) */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">My Account</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">My Account</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">Login/Register</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">Cart</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">Wishlist</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">Shop</a></li>
                        </ul>
                    </div>

                    {/* Fourth Column (Quick Links) */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms of Use</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">FAQ</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white transition text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Fifth Column (App Download and Social Media) */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Download Our App</h3>
                        <div className="flex items-center mb-4">
                            <img src={qrCodeImg} alt="QR Code" className="w-16 h-16 mr-4" />
                            <div className="flex flex-col gap-2">
                                <img src={googlePlay} alt="Google Play" className="w-36 cursor-pointer" />
                                <img src={appStore} alt="App Store" className="w-36 cursor-pointer" />
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex space-x-4 mt-6">
                            <FaFacebook className="w-6 h-6 text-white hover:text-blue-600 transition cursor-pointer" />
                            <FaTwitter className="w-6 h-6 text-white hover:text-blue-400 transition cursor-pointer" />
                            <FaInstagram className="w-6 h-6 text-white hover:text-pink-600 transition cursor-pointer" />
                            <FaLinkedin className="w-6 h-6 text-white hover:text-blue-800 transition cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-[#acacac]" />
            <div className="text-center text-sm text-[#acacac] py-5">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
        </div>
    );
}
