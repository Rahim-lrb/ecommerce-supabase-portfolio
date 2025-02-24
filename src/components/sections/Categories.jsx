import React from "react";
import { SlScreenSmartphone } from "react-icons/sl";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CgAppleWatch } from "react-icons/cg";
import { CiCamera } from "react-icons/ci";
import { FaHeadphonesAlt } from "react-icons/fa";
import { GiGamepad } from "react-icons/gi";

import Title from "../Title";

export default function Categories() {
    const categories = [
        { id: 1, name: "Smartphones", icon: <SlScreenSmartphone className="w-12 h-12 transition-colors duration-300 group-hover:text-white" /> },
        { id: 2, name: "Computers", icon: <HiOutlineDesktopComputer className="w-12 h-12 transition-colors duration-300 group-hover:text-white" /> },
        { id: 3, name: "Watches", icon: <CgAppleWatch className="w-12 h-12 transition-colors duration-300 group-hover:text-white" /> },
        { id: 4, name: "Cameras", icon: <CiCamera className="w-12 h-12 transition-colors duration-300 group-hover:text-white" /> },
        { id: 5, name: "Headphones", icon: <FaHeadphonesAlt className="w-12 h-12 transition-colors duration-300 group-hover:text-white" /> },
        { id: 6, name: "Gaming", icon: <GiGamepad className="w-12 h-12 stroke-4 transition-colors duration-300 group-hover:text-white" /> },
    ];

    return (
        <div>
            <Title title="Categories" />
            <h2 className="text-3xl font-semibold text-gray-900 my-10">Browse by Categories</h2>

            {/* Slider */}
            <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
                {/* Map over categories to dynamically render them */}
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="group w-44 h-36 flex flex-col items-center justify-center border border-gray-300 rounded-md space-y-2 transition-all duration-300 hover:bg-primary cursor-pointer"
                    >
                        <div className="text-black/70 group-hover:text-white">{category.icon}</div>
                        <p className="mt-2 text-black text-sm group-hover:text-white">{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
