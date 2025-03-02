import { useParams } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { FaTruck, FaUndo } from "react-icons/fa";

export default function ProductDetails() {
    const { productId } = useParams();

    // Dummy Product Data with Working Images
    const dummyProduct = {
        id: productId || "1",
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        price: "120",
        image: "https://source.unsplash.com/500x600/?headphones", // Main image
        rating: 4,
        smallImages: [
            "https://source.unsplash.com/170x138/?tech",
            "https://source.unsplash.com/170x138/?gadget",
            "https://source.unsplash.com/170x138/?audio",
            "https://source.unsplash.com/170x138/?headset",
        ],
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Small Images */}
            <div className="hidden md:flex flex-col gap-3 col-span-2">
                {dummyProduct.smallImages.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Product View ${index + 1}`}
                        className="w-[170px] h-[138px] object-cover cursor-pointer border border-gray-300 rounded-md hover:border-gray-500 transition"
                    />
                ))}
            </div>

            {/* Main Image */}
            <div className="col-span-5 flex justify-center">
                <img
                    src={dummyProduct.image}
                    alt={dummyProduct.name}
                    className="w-[500px] h-[600px] object-cover rounded-md shadow-md border border-gray-300"
                />
            </div>

            {/* Product Details */}
            <div className="col-span-5">
                <h1 className="text-3xl font-bold">{dummyProduct.name}</h1>
                <div className="text-yellow-500 mt-2 text-lg">
                    {"★".repeat(dummyProduct.rating) + "☆".repeat(5 - dummyProduct.rating)}
                </div>

                <div className="flex items-center space-x-3 mt-3">
                    <span className="text-primary text-2xl font-semibold">${dummyProduct.price}</span>
                    <span className="text-gray-400 line-through text-lg">$150</span>
                </div>

                <p className="text-gray-600 mt-4">{dummyProduct.description}</p>

                {/* Horizontal Line */}
                <hr className="my-6 border-gray-300" />

                {/* Delivery & Return Box */}
                <div className="border border-gray-300 rounded-md p-4 flex flex-col divide-y">
                    <div className="flex items-center space-x-3 pb-3">
                        <FaTruck className="text-green-600 text-xl" />
                        <span className="text-gray-700 font-medium">Free Delivery</span>
                    </div>
                    <div className="flex items-center space-x-3 pt-3">
                        <FaUndo className="text-blue-600 text-xl" />
                        <span className="text-gray-700 font-medium">Return & Delivery</span>
                    </div>
                </div>

                {/* Add to Cart & Wishlist */}
                <button className="bg-black text-white w-full mt-6 py-3 rounded-md transition hover:bg-gray-900">
                    Add to Cart
                </button>

                <div className="mt-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition">
                        <IoHeartOutline size={22} />
                        <span>Add to Wishlist</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
