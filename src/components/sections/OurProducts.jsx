import React from "react";
import Title from "../Title";
import Products from "../Products";

import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import product5 from "../../assets/product5.png";
import product6 from "../../assets/product6.png";
import product7 from "../../assets/product7.png";
import product8 from "../../assets/product8.png";


export default function OurProduct() {
    const flashSaleProducts = [
        { id: 1, name: "Sale Item 1", price: "$29.99", image: product1, rating: 4 },
        { id: 2, name: "Sale Item 1", price: "$29.99", image: product2, rating: 4 },
        { id: 3, name: "Sale Item 1", price: "$29.99", image: product3, rating: 4 },
        { id: 4, name: "Sale Item 1", price: "$29.99", image: product4, rating: 4 },
        { id: 5, name: "Sale Item 1", price: "$29.99", image: product5, rating: 4 },
        { id: 6, name: "Sale Item 1", price: "$29.99", image: product6, rating: 4 },
        { id: 7, name: "Sale Item 1", price: "$29.99", image: product7, rating: 4 },
        { id: 8, name: "Sale Item 1", price: "$29.99", image: product8, rating: 4 },
    ];

    return (
        <div>
            <Title title="Our products" />

            <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold">Explore our products</span>
            </div>

            <Products products={flashSaleProducts} />
            <div className="text-center my-10">
                <button className="bg-primary rounded-sm px-14 py-4 text-white font-medium capitalize">view all products</button>
            </div>
        </div>
    );
}

