import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import Title from "../Title";

// Import icons
import { SlScreenSmartphone } from "react-icons/sl";
import { MdFastfood } from "react-icons/md";
import { GiClothes, GiMedicines } from "react-icons/gi";
import { FaCouch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineSportsBasketball } from "react-icons/md";

export default function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase.from("category").select("*");
            if (error) {
                console.error("Error fetching categories:", error);
            } else {
                setCategories(data);
            }
        };

        fetchCategories();
    }, []);

    const categoryIcons = {
        electronics: <SlScreenSmartphone className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />,
        Food: <MdFastfood className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />,
        "men clothes": <GiClothes className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />,
        "women clothes": <GiClothes className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />,
        furniture: <FaCouch className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />,
        fitness: <MdOutlineSportsBasketball className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />,
        medicines: <GiMedicines className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />,
    };

    // Slider navigation functions (smoother scrolling with smaller steps)
    const scrollAmount = 200; // Moves by 200px instead of large jumps

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full">
            <Title title="Categories" />

            {/* Title and Slider Buttons */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold text-gray-900">Browse by Categories</h2>

                {/* Slider buttons */}
                <div className="flex space-x-3">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-full shadow-md"
                        onClick={scrollLeft}
                    >
                        <IoIosArrowBack size={24} />
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-full shadow-md"
                        onClick={scrollRight}
                    >
                        <IoIosArrowForward size={24} />
                    </button>
                </div>
            </div>

            {/* Categories Slider */}
            <div className="overflow-hidden relative">
                <div
                    ref={sliderRef}
                    className="flex space-x-6 overflow-x-scroll scroll-smooth"
                    style={{
                        scrollSnapType: "x mandatory",
                        scrollbarWidth: "none", // Hide scrollbar for Firefox
                        msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                    }}
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group w-40 h-36 flex flex-col items-center justify-center border border-gray-300 rounded-md space-y-2 transition-all duration-300 hover:bg-primary cursor-pointer flex-shrink-0"
                            style={{
                                scrollSnapAlign: "start",
                            }}
                            onClick={() => navigate(`/category/${category.name}`)}
                        >
                            <div className="text-black/70 group-hover:text-white">
                                {categoryIcons[category.name.toLowerCase()] || (
                                    <GiClothes className="w-12 h-12 transition-colors duration-300 group-hover:text-white" />
                                )}
                            </div>
                            <p className="mt-2 text-black text-sm group-hover:text-white">{category.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hide scrollbar (for Webkit-based browsers like Chrome/Safari) */}
            <style>
                {`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
}
