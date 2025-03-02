import React from "react";
import Title from "../Title";
import Products from "../Products";
import sale1 from "../../assets/sale 1.png";
import sale2 from "../../assets/sale 2.png";
import sale3 from "../../assets/sale 3.png";
import sale4 from "../../assets/sale 4.png";

export default function TodaySale() {
    const flashSaleProducts = [
        { id: 1, name: "Sale Item 1", price: "$29.99", image: sale1, rating: 4 },
        { id: 2, name: "Sale Item 2", price: "$49.99", image: sale2, rating: 5 },
        { id: 3, name: "Sale Item 3", price: "$19.99", image: sale3, rating: 3 },
        { id: 4, name: "Sale Item 4", price: "$39.99", image: sale4, rating: 5 },
    ];

    return (
        <div>
            <Title title="This month" />

            <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-semibold">Best selling products</span>
            </div>

            {/* Product List */}
            {/* <Products products={flashSaleProducts} /> */}
            <Products products={flashSaleProducts} />

            <div className="text-center my-10">
                <button className="bg-primary rounded-sm px-14 py-4 text-white font-medium capitalize">view all products</button>
            </div>
        </div>
    );
}

