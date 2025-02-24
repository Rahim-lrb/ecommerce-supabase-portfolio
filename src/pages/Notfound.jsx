import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[500px] text-center">
            <h1 className="text-9xl font-bold">404 Not Found</h1>
            <p className="text-lg mt-8">
                The page you are looking for doesn't exist. You may go back to the home page.
            </p>
            <Link to="/" className="mt-14">
                <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark cursor-pointer">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}
