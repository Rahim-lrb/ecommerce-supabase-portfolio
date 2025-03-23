// utils/WishlistApi.js
import supabase from "../supabaseClient";

// Get Wishlist Items with Full Product Details
// export const getWishlist = async (userId) => {
//     if (!userId) return [];

//     const { data, error } = await supabase
//         .from("wishlist")
//         .select("product:products(*)") // Join with products table
//         .eq("user_id", userId);

//     if (error) {
//         console.error("Error fetching wishlist:", error);
//         return [];
//     }

//     return data.map(item => item.product); // Return full product details
// };

// Add to Wishlist
export const addToWishlist = async (userId, productId) => {
    if (!userId) return { error: "User not authenticated" };

    const { data, error } = await supabase
        .from("wishlist")
        .upsert([{ user_id: userId, product_id: productId }]);

    if (error) {
        console.error("Error adding to wishlist:", error);
    }

    return { data, error };
};

// // Remove from Wishlist
// export const removeFromWishlist = async (userId, productId) => {
//     if (!userId) return { error: "User not authenticated" };

//     const { data, error } = await supabase
//         .from("wishlist")
//         .delete()
//         .eq("user_id", userId)
//         .eq("product_id", productId);

//     if (error) {
//         console.error("Error removing from wishlist:", error);
//     }

//     return { data, error };
// };

// // Clear Wishlist
// export const clearWishlist = async (userId) => {
//     if (!userId) return { error: "User not authenticated" };

//     const { data, error } = await supabase
//         .from("wishlist")
//         .delete()
//         .eq("user_id", userId);

//     if (error) {
//         console.error("Error clearing wishlist:", error);
//     }

//     return { data, error };
// };

// // Check if Product is in Wishlist
// export const isProductInWishlist = async (userId, productId) => {
//     if (!userId) return false;

//     const { data, error } = await supabase
//         .from("wishlist")
//         .select("id")
//         .eq("user_id", userId)
//         .eq("product_id", productId)
//         .single();

//     return !!data;
// };
