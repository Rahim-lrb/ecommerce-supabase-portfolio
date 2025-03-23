import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Title from "../Title";
import Products from "../Products";
import supabase from "../../supabaseClient";

export default function TodaySale() {
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const navigate = useNavigate(); // ✅ Initialize navigate

    useEffect(() => {
        const fetchFlashSaleProducts = async () => {
            const { data, error } = await supabase
                .from("product")
                .select("*")
                .eq("type", "flash-sale");

            if (error) {
                console.error("Error fetching flash sale products:", error);
            } else {
                // Shuffle products randomly and take only 4
                const shuffledProducts = data.sort(() => Math.random() - 0.5).slice(0, 4);
                setFlashSaleProducts(shuffledProducts);
            }
        };

        fetchFlashSaleProducts();
    }, []);

    return (
        <div>
            <Title title="Today's" />
            <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-semibold">Flash Sale</span>
                <div className="flex items-center gap-2">
                    <TimeBlock label="Days" value="03" />
                    <TimeSeparator />
                    <TimeBlock label="Hours" value="14" />
                    <TimeSeparator />
                    <TimeBlock label="Minutes" value="45" />
                    <TimeSeparator />
                    <TimeBlock label="Seconds" value="26" />
                </div>
            </div>

            <Products products={flashSaleProducts} />

            <div className="text-center my-10">
                <button 
                    className="bg-primary rounded-sm px-14 py-4 text-white font-medium capitalize cursor-pointer"
                    onClick={() => navigate("/products?filter=flash-sale")} // ✅ navigate will now work
                >
                    View all products
                </button>
            </div>
        </div>
    );
}

// Single Time Block Component
function TimeBlock({ label, value }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">{label}</span>
            <div>
                <span className="text-3xl font-bold">{value}</span>
            </div>
        </div>
    );
}

// Time Separator Component
function TimeSeparator() {
    return <span className="text-3xl font-bold flex items-end">:</span>;
}
