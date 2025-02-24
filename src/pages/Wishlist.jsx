import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";
import product7 from "../assets/product7.png";
import product8 from "../assets/product8.png";

export default function Wishlist() {
    const wishlist = [
        { id: 1, name: "Wishlist Item 1", price: "$29.99", image: product1, rating: 4 },
        { id: 2, name: "Wishlist Item 2", price: "$39.99", image: product2, rating: 5 },
        { id: 3, name: "Wishlist Item 3", price: "$19.99", image: product3, rating: 3 },
        { id: 4, name: "Wishlist Item 4", price: "$49.99", image: product4, rating: 4 },
        { id: 5, name: "Wishlist Item 5", price: "$59.99", image: product5, rating: 5 },
        { id: 6, name: "Wishlist Item 6", price: "$24.99", image: product6, rating: 4 },
        { id: 7, name: "Wishlist Item 7", price: "$34.99", image: product7, rating: 3 },
        { id: 8, name: "Wishlist Item 8", price: "$44.99", image: product8, rating: 4 },
    ];

    return (
        <div className="rounded-lg bg-white text-black py-10 px-26">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl tracking-wide">Wishlist ({wishlist.length})</h2>
                <button className="px-4 py-2 border border-gray-300 text-lg font-medium hover:bg-gray-200 transition">
                    Move All to Bag
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                    <WishlistCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

function WishlistCard({ product }) {
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);

    return (
        <div className="bg-white p-4 transition-all duration-300 text-black">
            {/* Image Container */}
            <div
                className="w-[270px] h-[250px] flex justify-center items-center bg-[#F5F5F5] relative overflow-hidden"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img src={product.image} alt={product.name} className="object-cover" />

                {/* Add to Cart Button */}
                <div
                    className={`absolute left-0 w-full text-white text-center py-2 transition-all duration-300 
                        ${hovered || added ? "bottom-0" : "bottom-[-50px]"}
                        ${added ? "bg-green-600" : "bg-black"}
                    `}
                >
                    <button onClick={() => setAdded(!added)}>
                        {added ? "Added to Cart" : "Add to Cart"}
                    </button>
                </div>

                {/* Remove from Wishlist Icon */}
                <div className="absolute top-2 right-2">
                    <button className="p-2 rounded-full bg-white transition">
                        <IoTrashOutline size={20} />
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="mt-4">
                <h3 className="text-md font-bold">{product.name}</h3>
                <div className="flex space-x-3">
                    <p className="text-primary font-normal">{product.price}</p>
                    <p className="text-gray-400 font-semibold line-through">$960</p>
                </div>
                <div className="text-yellow-500 mt-1">
                    {"★".repeat(product.rating) + "☆".repeat(5 - product.rating)}
                </div>
            </div>
        </div>
    );
}
