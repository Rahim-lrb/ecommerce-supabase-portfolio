import { useState, useEffect } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import supabase from "../supabaseClient";
import { useAuth } from "../contexts/authContext";

export default function Product({ product, showRemove = false, setWishlist }) {
    const { session } = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (session) {
            checkIfLiked();
        }
    }, [session]);

    const checkIfLiked = async () => {
        if (!session) return;

        const { data, error } = await supabase
            .from("wishlist")
            .select("id")
            .eq("user_id", session.user.id)
            .eq("product_id", product.id)
            .maybeSingle();

        if (error && error.code !== "PGRST116") {
            console.error("Error checking wishlist:", error);
        } else {
            setIsLiked(!!data);
        }
    };

    const toggleWishlist = async () => {
        if (!session) {
            alert("Please log in to save items to your wishlist.");
            return;
        }

        setIsLiked(!isLiked);

        if (isLiked) {
            const { error } = await supabase
                .from("wishlist")
                .delete()
                .eq("user_id", session.user.id)
                .eq("product_id", product.id);

            if (error) {
                console.error("Error removing from wishlist:", error);
                setIsLiked(true);
            } else {
                setWishlist((prev) => prev.filter((p) => p.id !== product.id));
            }
        } else {
            const { error } = await supabase
                .from("wishlist")
                .upsert([{ user_id: session.user.id, product_id: product.id }]);

            if (error) {
                console.error("Error adding to wishlist:", error);
                setIsLiked(false);
            }
        }
    };

    const addToCart = async () => {
        if (!session) {
            alert("Please log in to add items to your cart.");
            return;
        }

        const { error } = await supabase
            .from("cart")
            .upsert([{ user_id: session.user.id, product_id: product.id }]);

        if (error) {
            console.error("Error adding to cart:", error);
        } else {
            // Remove from wishlist after adding to cart
            await supabase
                .from("wishlist")
                .delete()
                .eq("user_id", session.user.id)
                .eq("product_id", product.id);

            setWishlist((prev) => prev.filter((p) => p.id !== product.id));
        }
    };

    return (
        <div className="bg-white transition-all duration-300 text-black">
            <div className="relative max-w-[260px] h-[240px] flex justify-center items-center bg-[#F5F5F5]">
                <img src={product.image_main} alt={product.name} className="object-cover" />

                <div className="absolute top-2 right-2">
                    {showRemove ? (
                        <button className="p-2 rounded-full bg-white transition" onClick={toggleWishlist}>
                            <IoHeart size={22} color="red" />
                        </button>
                    ) : (
                        <button className="p-2 rounded-full bg-white transition" onClick={toggleWishlist}>
                            {isLiked ? <IoHeart size={22} color="red" /> : <IoHeartOutline size={22} />}
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-md font-bold">{product.name}</h3>
                <p className="text-primary font-semibold">$ {product.price}</p>
                {showRemove ? (
                    <button 
                        onClick={addToCart} 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-2"
                    >
                        Add to Cart
                    </button>
                ) : null}
            </div>
        </div>
    );
}
