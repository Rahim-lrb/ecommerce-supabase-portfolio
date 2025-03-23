import React, { useEffect, useState } from "react";
import Title from "../Title";
import Products from "../Products";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function OurProduct() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from("product").select("*").limit(8);
            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Title title="Our products" />

            <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-semibold">Explore our products</span>
            </div>

            <Products products={products} />
            <div className="text-center my-10">
                <button className="bg-primary rounded-sm px-14 py-4 text-white font-medium capitalize cursor-pointer" onClick={() => navigate("/products")}>
                    view all products
                </button>
            </div>
        </div>
    );
}
