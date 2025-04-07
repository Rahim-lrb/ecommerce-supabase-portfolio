import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAuth } from "./authContext";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { session } = useAuth();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (session) {
            fetchCart();
        }
    }, [session]);

    const fetchCart = async () => {
        if (!session) return;

        const { data, error } = await supabase
            .from("cart")
            .select("product:product_id(*)")
            .eq("user_id", session.user.id);

        if (!error) {
            setCart(data.map((item) => item.product));
        } else {
            console.error("Error fetching cart:", error);
        }
    };

    const addToCart = async (product) => {
        if (!session) return;
        
        const { error } = await supabase
            .from("cart")
            .insert([{ user_id: session.user.id, product_id: product.id }]);

        if (!error) {
            setCart((prev) => [...prev, product]);
        } else {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (productId) => {
        if (!session) return;

        const { error } = await supabase
            .from("cart")
            .delete()
            .eq("user_id", session.user.id)
            .eq("product_id", productId);

        if (!error) {
            setCart((prev) => prev.filter((item) => item.id !== productId));
        } else {
            console.error("Error removing from cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
