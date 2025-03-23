import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import supabase from "../supabaseClient";
import Products from "../components/Products";
import { Trash } from "lucide-react";

export default function WishlistPage() {
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

        if (error) {
            console.error("Error fetching wishlist:", error);
        } else {
            setWishlist(data.map(item => item.product));
        }
    };

    const handleClearWishlist = async () => {
        if (!session) return;

        const { error } = await supabase
            .from("wishlist")
            .delete()
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Error clearing wishlist:", error);
        } else {
            setWishlist([]);
        }
    };

    return (
        <div className="px-26 py-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h1>
            {wishlist.length > 0 ? (
                <>
                    <button onClick={handleClearWishlist} className="block mx-auto mb-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                        <Trash size={16} className="inline-block mr-2" /> Clear Wishlist
                    </button>
                    <Products products={wishlist} showRemove={true} />
                </>
            ) : (
                <p className="text-gray-500 text-center">Your wishlist is empty.</p>
            )}
        </div>
    );
}
