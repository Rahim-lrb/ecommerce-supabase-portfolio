import React, { useEffect, useState } from "react";
import Title from "../Title";
import Products from "../Products";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ThisMonth() {
    const navigate = useNavigate();
    const [bestSellingProducts, setBestSellingProducts] = useState([]);

    useEffect(() => {
        const fetchBestSellingProducts = async () => {
            const { data, error } = await supabase
                .from("product")
                .select("*")
                .eq("type", "best-selling") // Only get best-selling products
                .limit(4);

            if (error) {
                console.error("Error fetching best-selling products:", error);
            } else {
                setBestSellingProducts(data);
            }
        };

        fetchBestSellingProducts();
    }, []);

    return (
        <div>
            <Title title="This Month" />
            <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-semibold">Best Selling Products</span>
            </div>

            <Products products={bestSellingProducts} />

            <div className="text-center my-10">
                <button 
                    className="bg-primary rounded-sm px-14 py-4 text-white font-medium capitalize cursor-pointer"
                    onClick={() => navigate("/products?filter=best-selling")}
                >
                    View all products
                </button>
            </div>
        </div>
    );
}
