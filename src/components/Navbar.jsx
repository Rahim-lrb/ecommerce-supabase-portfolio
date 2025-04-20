import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Heart, ShoppingCart, User, LogOut, UserCog,
    Package, Bookmark, LogIn, UserPlus
} from "lucide-react";
import Logo from "../assets/Logo.png";
import SearchBar from "./SearchBar";
import { useAuth } from "../contexts/authContext";
import { useWishlist } from "../contexts/wishlistContext";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const { session, signOut } = useAuth();
    const { wishlist } = useWishlist();
    const { cart } = useCart(); // Get live cart data
    const wishlistCount = wishlist.length;
    const cartCount = cart.length; // Fix: Get cart count dynamically

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();
    // console.log(session.user)

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
    ];

    return (
        <div className="flex justify-between items-center px-6 py-7 sm:px-10 lg:px-26 relative border-secondary border-b">
            {/* Logo */}
            <div>
                <Link to={"/"}><img src={Logo} alt="Logo" /></Link>
            </div>

            {/* Links */}
            <ul className="hidden lg:flex xl:space-x-8 text-sm xl:text-base">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className={`relative px-4 py-2 transition-all duration-200 ${
                                location.pathname === link.path ? "text-primary font-bold" : ""
                            }`}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Icons and Auth Links */}
            <div className="flex space-x-4 items-center">
                <SearchBar className="opacity-60" />

                {/* Wishlist */}
                <Link to="/wishlist" className="relative cursor-pointer" aria-label="Wishlist">
                    <Heart className="opacity-60 hover:opacity-100 transition" />
                    {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {wishlistCount}
                        </span>
                    )}
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative cursor-pointer" aria-label="Cart">
                    <ShoppingCart className="opacity-60 hover:opacity-100 transition" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:ml-3 cursor-pointer flex items-center justify-center w-10 h-10 rounded-full transition hover:bg-opacity-90 focus:outline-none ${
                            session ? "bg-red-500" : "bg-gray-700/50"
                        }`}
                        aria-label="User menu"
                    >
                        <User className="w-5 h-5 text-white" />
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-gray-900/80 backdrop-blur-lg rounded-md border border-gray-700 shadow-lg p-2 animate-fadeIn">
                            <ul className="flex flex-col text-white text-sm">
                                {session ? (
                                    <>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <UserCog className="w-4 h-4" />
                                                Manage Account
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <UserCog className="w-4 h-4" />
                                                Manage Account
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/orders"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <Package className="w-4 h-4" />
                                                My Orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/wishlist"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <Bookmark className="w-4 h-4" />
                                                Wishlist
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    setMenuOpen(false);
                                                    navigate("/");
                                                }}
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/20 hover:text-red-600 rounded"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/login"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <LogIn className="w-4 h-4" />
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/register"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700/50 rounded"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <UserPlus className="w-4 h-4" />
                                                Signup
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
