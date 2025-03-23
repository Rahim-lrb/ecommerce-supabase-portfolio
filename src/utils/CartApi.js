import supabase from "../supabaseClient";

// Get the authenticated user ID
export const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    return data.user.id;
};

// Add a product to the cart
export const addToCart = async (productId, quantity = 1) => {
    const userId = await getUserId();
    if (!userId) return { error: "User not authenticated" };

    const { data, error } = await supabase
        .from("cart")
        .upsert([{ user_id: userId, product_id: productId, quantity }], { onConflict: ['user_id', 'product_id'] });

    return { data, error };
};

// Remove a product from the cart
export const removeFromCart = async (productId) => {
    const userId = await getUserId();
    if (!userId) return { error: "User not authenticated" };

    const { data, error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);

    return { data, error };
};

// Retrieve all cart items
export const getCart = async () => {
    const userId = await getUserId();
    if (!userId) return { error: "User not authenticated" };

    const { data, error } = await supabase
        .from("cart")
        .select("product_id, quantity")
        .eq("user_id", userId);

    return { data: data || [], error };
};

// Update the quantity of a product in the cart
export const updateCartQuantity = async (productId, quantity) => {
    const userId = await getUserId();
    if (!userId) return { error: "User not authenticated" };

    const { data, error } = await supabase
        .from("cart")
        .update({ quantity })
        .eq("user_id", userId)
        .eq("product_id", productId);

    return { data, error };
};
