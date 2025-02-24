import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, User, LogOut, UserCog, Package, Bookmark, LogIn, UserPlus } from "lucide-react";
import Logo from "../assets/Logo.png";
import SearchBar from "./SearchBar";
import { UserAuth } from "../contexts/authContext";

export default function Navbar() {
    const { session, signOut } = UserAuth();
    const wishlistCount = 3; // Replace with actual state
    const cartCount = 5; // Replace with actual state

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => document.removeEventListener("click", handleClickOutside);
    }, [menuOpen]);

    const links = [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
        { name: "About", path: "/about" },
        { name: "Signup", path: "/register" },
    ];

    return (
        <div className="flex justify-between items-center px-6 py-7 sm:px-10 lg:px-26 relative cursor-pointer
            border-secondary border-b">
            {/* Logo */}
            <div className="">
                <img src={Logo} alt="Logo" />
            </div>

            {/* Links */}
            <ul className="hidden lg:flex xl:space-x-8 text-sm xl:text-base">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link to={link.path} className="relative px-4 py-2 transition-all duration-200">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Icons and Auth Links */}
            <div className="flex space-x-4 items-center">
                <SearchBar className="opacity-60" />

                {/* Wishlist */}
                <div className="relative cursor-pointer">
                    <Heart className="opacity-60 hover:opacity-100 transition" />
                    {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {wishlistCount}
                        </span>
                    )}
                </div>

                {/* Cart */}
                <Link to="/cart" className="relative cursor-pointer">
                    <ShoppingCart className="opacity-60 hover:opacity-100 transition" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* User */}
                {session ? (
                    <div className="relative" id="user-menu" ref={menuRef}>
                        {/* User Icon (Click to Toggle Menu) */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center justify-center w-10 h-10 bg-gray-700/50 text-white rounded-full transition hover:bg-opacity-90 focus:outline-none"
                        >
                            <User className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-52 z-50
                             bg-gray-400/60 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-100">
                                <ul className="flex flex-col p-2 text-white text-sm">
                                    <li>
                                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded" onClick={() => setMenuOpen(false)}>
                                            <UserCog className="w-4 h-4" />
                                            Manage Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/cart" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded" onClick={() => setMenuOpen(false)}>
                                            <ShoppingCart className="w-4 h-4" />
                                            Cart
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded" onClick={() => setMenuOpen(false)}>
                                            <Bookmark className="w-4 h-4" />
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded" onClick={() => setMenuOpen(false)}>
                                            <Package className="w-4 h-4" />
                                            My Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => { signOut(); setMenuOpen(false); }}
                                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/20 hover:text-red-600 rounded"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative" id="user-menu" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center justify-center w-14 h-14 opacity-60 transition hover:bg-opacity-100 cursor-pointer"
                        >
                            <User className="w-6 h-6" />
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-gray-800/40 backdrop-blur-lg shadow-lg rounded-lg border border-gray-600 z-50">
                                <ul className="flex flex-col p-2 text-white text-sm">
                                    <li>
                                        <Link to="/login" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded" onClick={() => setMenuOpen(false)}>
                                            <LogIn className="w-4 h-4" />
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded" onClick={() => setMenuOpen(false)}>
                                            <UserPlus className="w-4 h-4" />
                                            Signup
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
