import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAuth } from "./authContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const { session } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (session) {
            fetchWishlist();
        }
    }, [session]);

    const fetchWishlist = async () => {
        if (!session) return;

        const { data, error } = await supabase
            .from("wishlist")
            .select("product:product_id(*)")
            .eq("user_id", session.user.id);

        if (!error) {
            setWishlist(data.map((item) => item.product));
        } else {
            console.error("Error fetching wishlist:", error);
        }
    };

    const addToWishlist = async (product) => {
        if (!session) return;
        
        const { error } = await supabase
            .from("wishlist")
            .insert([{ user_id: session.user.id, product_id: product.id }]);

        if (!error) {
            setWishlist((prev) => [...prev, product]);
        } else {
            console.error("Error adding to wishlist:", error);
        }
    };

    const removeFromWishlist = async (productId) => {
        if (!session) return;

        const { error } = await supabase
            .from("wishlist")
            .delete()
            .eq("user_id", session.user.id)
            .eq("product_id", productId);

        if (!error) {
            setWishlist((prev) => prev.filter((item) => item.id !== productId));
        } else {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
