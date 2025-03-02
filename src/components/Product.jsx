import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";


export default function Product({ product, showRemove = false }) {
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);

    return (
        <div className="bg-white transition-all duration-300 text-black">
            {/* Image Container */}
            <div
                className="max-w-[260px] h-[240px] flex justify-center items-center bg-[#F5F5F5] relative overflow-hidden"
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
                {/* Heart Icon */}
                <div className="absolute top-2 right-2 hover:text-white ">
                    <button className="p-2 rounded-full bg-white transition hover:bg-primary duration-300">
                        <IoHeartOutline size={22} />
                    </button>
                </div>

                {showRemove && (
                    <div className="absolute top-2 right-2">
                        <button className="p-2 rounded-full bg-white transition">
                            <IoTrashOutline size={20} />
                        </button>
                    </div>
                )}
            </div>

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
