import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import supabase from "../supabaseClient";
import { ChevronUp, ChevronDown, X } from "lucide-react";

export default function CartPage() {
    const { session } = useAuth();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchCart();
        }
    }, [session]);

    const fetchCart = async () => {
        if (!session) return;

        setLoading(true);
        const { data, error } = await supabase
            .from("cart")
            .select("product:product_id(*), quantity")
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Error fetching cart:", error);
        } else {
            const products = data.map(item => ({ ...item.product, quantity: item.quantity }));
            setCart(products);
            calculateTotal(products);
        }
        setLoading(false);
    };

    const calculateTotal = (products) => {
        const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setTotal(totalPrice);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-24">
            {loading ? (
                // Improved Skeleton Loader
                <div className="space-y-6">
                    {/* Table Header Skeleton */}
                    <div className="grid grid-cols-5 gap-x-12 pb-4 border-b border-gray-300">
                        {["Product", "Price", "Quantity", "Subtotal", "Remove"].map((_, i) => (
                            <div key={i} className="h-5 w-24 bg-gray-300 animate-pulse rounded"></div>
                        ))}
                    </div>

                    {/* Skeleton Cart Items */}
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="grid grid-cols-5 gap-x-12 items-center py-6 border-b border-gray-200/50">
                            {/* Image & Name Skeleton */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-300 animate-pulse rounded"></div>
                                <div className="h-5 w-36 bg-gray-300 animate-pulse rounded"></div>
                            </div>

                            {/* Price Skeleton */}
                            <div className="h-5 w-16 bg-gray-300 animate-pulse rounded"></div>

                            {/* Quantity Selector Skeleton */}
                            <div className="h-8 w-16 bg-gray-300 animate-pulse rounded"></div>

                            {/* Subtotal Skeleton */}
                            <div className="h-5 w-16 bg-gray-300 animate-pulse rounded"></div>

                            {/* Remove Button Skeleton */}
                            <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full"></div>
                        </div>
                    ))}

                    {/* Footer Skeleton */}
                    <div className="flex justify-between mt-8">
                        <div className="h-10 w-40 bg-gray-300 animate-pulse rounded"></div>
                        <div className="h-40 w-64 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Actual Cart Items Rendering */}
                    {cart.length > 0 ? (
                        <>
                            <div className="grid grid-cols-5 gap-x-12 font-medium text-md pb-4 border-b border-gray-300">
                                <p>Product</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                                <p>Remove</p>
                            </div>

                            {cart.map((product) => (
                                <div key={product.id} className="grid grid-cols-5 gap-x-12 items-center py-6 border-b border-gray-200/50">
                                    {/* Product Image & Name */}
                                    <div className="flex items-center gap-4">
                                        <img src={product.image_main} alt={product.name} className="w-16 h-16 object-contain rounded" />
                                        <p className="font-medium">{product.name}</p>
                                    </div>

                                    {/* Price */}
                                    <p className="text-gray-700 font-medium">${product.price.toFixed(2)}</p>

                                    {/* Quantity Selector */}
                                    <div className="flex items-center">
                                        <div className="relative flex flex-col items-center border rounded-md w-16 border-gray-200">
                                            <span className="text-lg font-medium py-2 mr-6">{product.quantity.toString().padStart(2, '0')}</span>
                                            <div className="absolute right-0 top-0 bottom-0 flex flex-col">
                                                <button className="p-1 rounded-tr-md">
                                                    <ChevronUp size={14} />
                                                </button>
                                                <button className="p-1 rounded-br-md">
                                                    <ChevronDown size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <p className="text-gray-800 font-medium">${(product.price * product.quantity).toFixed(2)}</p>

                                    {/* Remove Button */}
                                    <button className="text-gray-500 hover:text-red-500 transition duration-300">
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}

                            {/* Footer Section */}
                            <div className="flex justify-between items-start mt-8">
                                {/* Return to Shop Button */}
                                <button className="text-black border-gray-400 px-10 border py-3 mt-6 duration-300 hover:bg-gray-100 rounded-lg font-semibold">
                                    Return to Shop
                                </button>

                                {/* Cart Summary Box */}
                                <div className="p-6 rounded-md shadow-md w-100 border mt-8 border-gray-400">
                                    <h2 className="text-lg font-medium mb-4">Cart Total</h2>
                                    <div className="flex justify-between py-2 border-b border-gray-400 text-md">
                                        <p>Subtotal:</p>
                                        <p className="font-normal">${total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-400">
                                        <p>Shipping:</p>
                                        <p>Free</p>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <p className="font-medium text-md">Total:</p>
                                        <p className="font-medium text-md">${total.toFixed(2)}</p>
                                    </div>
                                    <button className="mt-4 w-full bg-primary/90 hover:bg-primary text-white py-3 rounded-sm font-semibold duration-300">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
                    )}
                </>
            )}
        </div>
    );
}
