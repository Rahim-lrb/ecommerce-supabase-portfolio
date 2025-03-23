import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Products from "../components/Products";
import supabase from "../supabaseClient";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0); // ✅ Track total count
    const pageSize = 8;
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter"); // Get filter from URL

    useEffect(() => {
        const fetchProducts = async () => {
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize - 1;

            let query = supabase.from("product").select("*", { count: "exact" }).range(start, end);

            // Apply filter if exists
            if (filter) {
                query = query.eq("type", filter);
            }

            const { data, error, count } = await query;

            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data);
                setTotalProducts(count || 0); // ✅ Update total count
            }
        };

        fetchProducts();
    }, [currentPage, filter]); // Refetch when page or filter changes

    const totalPages = Math.ceil(totalProducts / pageSize); // ✅ Calculate total pages

    return (
        <div className="px-26 py-12">
            <Products products={products} />

            <div className="flex justify-center mt-10 space-x-4 items-center">
                {/* ✅ Disable Previous Button on First Page */}
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

                {/* ✅ Disable Next Button when no more products */}
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
