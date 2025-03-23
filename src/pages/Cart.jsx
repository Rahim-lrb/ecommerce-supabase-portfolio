import { useEffect, useState } from "react";
import { addToCart, removeFromCart, getCart, updateCartQuantity } from "../utils/CartApi";
import { useAuth } from "../contexts/authContext";
import Product from "../components/Product";

export default function CartPage() {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user) {
            getCart().then(({ data, error }) => {
                if (!error) setCart(data || []);
            });
        }
    }, [user]);

    const handleRemove = async (productId) => {
        const { error } = await removeFromCart(productId);
        if (!error) setCart(cart.filter(item => item.product_id !== productId));
    };

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cart.map(({ product_id, quantity }) => (
                        <div key={product_id} className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
                            <Product productId={product_id} />
                            <p className="mt-2">Quantity: {quantity}</p>
                            <button onClick={() => handleRemove(product_id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
}
