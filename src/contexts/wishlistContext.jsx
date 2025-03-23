import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useAuth } from "./authContext";

// Create Context
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
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
            .select("*")
            .eq("user_id", session.user.id);

        if (error) console.error("Error fetching wishlist:", error);
        else setWishlist(data);
    };

    const addToWishlist = async (product) => {
        if (!session) return;
        const { error } = await supabase
            .from("wishlist")
            .insert([{ user_id: session.user.id, product_id: product.id }]);

        if (!error) {
            setWishlist((prev) => [...prev, product]); // Update state
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
            setWishlist((prev) => prev.filter((item) => item.id !== productId)); // Update state
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
