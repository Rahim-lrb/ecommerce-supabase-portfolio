import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import supabase from "../supabaseClient";
import Products from "../components/Products";
import { Trash } from "lucide-react";

export default function WishlistPage() {
    const { session } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchWishlist();
        }
    }, [session]);

    const fetchWishlist = async () => {
        if (!session) return;

        setLoading(true);
        const { data, error } = await supabase
            .from("wishlist")
            .select("product:product_id(*)")
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Error fetching wishlist:", error);
        } else {
            setWishlist(data.map(item => item.product));
        }
        setLoading(false);
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

            {loading ? (
                // Skeleton Loader
                <div className="space-y-6">
                    {/* Button Skeleton */}
                    <div className="h-10 w-48 mx-auto bg-gray-300 animate-pulse rounded"></div>

                    {/* Product Skeletons */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="p-4 border rounded-md animate-pulse">
                                <div className="h-40 bg-gray-300 rounded"></div>
                                <div className="h-5 w-3/4 bg-gray-300 rounded mt-4"></div>
                                <div className="h-5 w-1/2 bg-gray-300 rounded mt-2"></div>
                                <div className="h-8 w-full bg-gray-300 rounded mt-4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : wishlist.length > 0 ? (
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
