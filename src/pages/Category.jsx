import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import supabase from "../supabaseClient";

export default function Category() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const pageSize = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize - 1;

            // Fetch products filtered by category
            const { data, error, count } = await supabase
                .from("product")
                .select("*, category!inner(name)", { count: "exact" }) // Fetch total count too
                .eq("category.name", categoryName) // Use dynamic category name
                .range(start, end);

            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data);
                setTotalProducts(count || 0); // Update total count
            }
            setLoading(false);
        };

        fetchProducts();
    }, [currentPage, categoryName]); // Refetch when category or page changes

    const totalPages = Math.ceil(totalProducts / pageSize);

    return (
        <div className="px-26 py-12">
            <h1 className="text-2xl font-bold mb-4 capitalize">
                {categoryName} Products
            </h1>

            {loading ? (
                <p className="text-gray-500">Loading products...</p>
            ) : products.length > 0 ? (
                <Products products={products} />
            ) : (
                <p className="text-gray-500">No products found in this category.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-4 items-center">
                {/* Disable "Previous" on the first page */}
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 bg-primary/70 text-white rounded ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>

                {/* Disable "Next" when there are no more products */}
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-4 py-2 bg-primary text-white rounded ${
                        currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
