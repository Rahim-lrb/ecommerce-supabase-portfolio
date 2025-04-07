import { useState, useEffect } from "react";
import { IoHeartOutline, IoHeart, IoCartOutline, IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import { useAuth } from "../contexts/authContext";

export default function Product({ product, showRemove = false, setWishlist, setCart }) {
    const { session } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (session) {
            checkIfLiked();
            checkIfInCart();
        }
    }, [session]);

    const checkIfLiked = async () => {
        if (!session) return;

        const { data } = await supabase
            .from("wishlist")
            .select("id")
            .eq("user_id", session.user.id)
            .eq("product_id", product.id)
            .maybeSingle();

        setIsLiked(!!data);
    };

    const checkIfInCart = async () => {
        if (!session) return;

        const { data } = await supabase
            .from("cart")
            .select("id")
            .eq("user_id", session.user.id)
            .eq("product_id", product.id)
            .maybeSingle();

        setIsInCart(!!data);
    };

    const toggleWishlist = async (event) => {
        event.stopPropagation(); // Prevents navigation

        if (!session) {
            alert("Please log in to save items to your wishlist.");
            return;
        }

        setIsLiked(!isLiked);

        if (isLiked) {
            await supabase.from("wishlist").delete().eq("user_id", session.user.id).eq("product_id", product.id);
            setWishlist((prev) => prev.filter((p) => p.product_id !== product.id));
        } else {
            await supabase.from("wishlist").upsert([{ user_id: session.user.id, product_id: product.id }]);
        }
    };

    const toggleCart = async (event) => {
        event.stopPropagation(); // Prevents navigation

        if (!session) {
            alert("Please log in to add items to your cart.");
            return;
        }

        setIsInCart(!isInCart);

        if (isInCart) {
            await supabase.from("cart").delete().eq("user_id", session.user.id).eq("product_id", product.id);
            setCart((prev) => prev.filter((p) => p.product_id !== product.id));
        } else {
            await supabase.from("cart").upsert([{ user_id: session.user.id, product_id: product.id }]);
        }
    };

    return (
        <Link to={`/product/${product.id}`} className="block">
            <div className="bg-white transition-all duration-300 text-black cursor-pointer">
                <div className="relative max-w-[260px] h-[240px] flex justify-center items-center bg-[#F5F5F5]">
                    <img src={product.image_main} alt={product.name} className="object-cover" />

                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2">
                        <button className="p-2 rounded-full bg-white transition" onClick={toggleWishlist}>
                            {isLiked ? <IoHeart size={22} color="red" /> : <IoHeartOutline size={22} />}
                        </button>
                    </div>

                    {/* Cart Button */}
                    <div className="absolute top-14 right-2">
                        <button className="p-2 rounded-full bg-white transition" onClick={toggleCart}>
                            {isInCart ? <IoCart size={22} color="blue" /> : <IoCartOutline size={22} />}
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-md font-bold">{product.name}</h3>
                    <p className="text-primary font-semibold">$ {product.price}</p>
                </div>
            </div>
        </Link>
    );
}
