import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import Products from "../components/Products";

export default function CategoryPage() {
    const { categoryName } = useParams(); // Get category name from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("category", categoryName); // Filter by category

            if (error) {
                console.error("Error fetching products:", error.message);
            } else {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [categoryName]);

    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </h2>

            {loading ? (
                <p>Loading...</p>
            ) : products.length > 0 ? (
                <Products products={products} />
            ) : (
                <p>No products found in this category.</p>
            )}
        </div>
    );
}
