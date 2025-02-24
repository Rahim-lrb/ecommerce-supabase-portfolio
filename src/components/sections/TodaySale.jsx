import React from "react";
import Title from "./Title";
import Products from "./Products";
import sale1 from "../assets/sale 1.png";
import sale2 from "../assets/sale 2.png";
import sale3 from "../assets/sale 3.png";
import sale4 from "../assets/sale 4.png";

export default function TodaySale() {
    const flashSaleProducts = [
        { id: 1, name: "Sale Item 1", price: "$29.99", image: sale1, rating: 4 },
        { id: 2, name: "Sale Item 2", price: "$49.99", image: sale2, rating: 5 },
        { id: 3, name: "Sale Item 3", price: "$19.99", image: sale3, rating: 3 },
        { id: 4, name: "Sale Item 4", price: "$39.99", image: sale4, rating: 5 },
    ];

    return (
        <div>
            <Title title="Today's" />

            <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold">Flash Sale </span>

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
                <button className="bg-primary rounded-sm px-14 py-4 text-white font-medium capitalize">view all products</button>
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
