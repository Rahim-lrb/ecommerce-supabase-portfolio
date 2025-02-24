import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import sideImage from "../assets/Side Image.png";
import { UserAuth } from "../contexts/authContext";

export default function Register() {
    const { signUpNewUser, signInWithGoogle } = UserAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!formData.fullName || !formData.email || !formData.password) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        const result = await signUpNewUser(formData.fullName, formData.email, formData.password);

        if (result.success) {
            console.log("User signed up:", result.data);
            setFormData({ fullName: "", email: "", password: "" });
            navigate("/"); // Redirect to home page
        } else {
            setError(result.error);
        }

        setLoading(false);
    };




    // Handle Google Sign Up
    const handleGoogleSignUp = async () => {
        const result = await signInWithGoogle();
        if (result.success) {
            navigate("/"); // Redirect to home
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="flex h-screen mt-6 mb-20">
            <div className="hidden lg:flex w-1/2 h-full">
                <img src={sideImage} alt="Side" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 md:px-12 lg:px-28">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create Account</h2>
                <p className="text-gray-700 font-medium mb-6 text-lg tracking-wide">
                    Enter your details below
                </p>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}
                        className="w-full border-b border-gray-400 focus:border-primary outline-none p-2 text-gray-800"
                    />
                    <input 
                        type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                        className="w-full border-b border-gray-400 focus:border-primary outline-none p-2 text-gray-800"
                    />
                    <input 
                        type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                        className="w-full border-b border-gray-400 focus:border-primary outline-none p-2 text-gray-800"
                    />
                    <button type="submit" disabled={loading}
                        className={`w-full bg-primary text-white py-3 rounded-md transition ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"
                        }`}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <button className="w-full flex items-center justify-center gap-2 border border-gray-400 py-3 mt-4 rounded-md hover:bg-gray-100 transition"     onClick={handleGoogleSignUp}>
                    <FcGoogle className="text-2xl" /> Sign up with Google
                </button>

                <p className="mt-4 text-gray-600 text-sm text-center">
                    Already have an account? <a href="/login" className="underline text-primary">Login</a>
                </p>
            </div>
        </div>
    );
}
