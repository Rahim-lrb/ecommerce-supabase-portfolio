import React from "react";
import { Link } from "react-router-dom";
import heroimg from "../../assets/heroimg.png";

export default function Hero() {
    const categories = [
        { name: "Women's Fashion", link: "/categories/women" },
        { name: "Men's Fashion", link: "/categories/men" },
        { name: "Electronics", link: "/categories/electronics" },
        { name: "Home and Lifestyle", link: "/categories/home-lifestyle" },
        { name: "Medicine", link: "/categories/medicine" },
        { name: "Sports and Outdoor", link: "/categories/sports-outdoor" },
        { name: "Baby's and Toys", link: "/categories/babys-toys" },
        { name: "Groceries and Pets", link: "/categories/groceries-pets" },
        { name: "Health and Beauty", link: "/categories/health-beauty" }
    ];

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:flex flex-col w-[250px] border-r border-secondary h-full">
                <ul className="space-y-4 pt-8 pr-10">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link
                                to={category.link}
                                className="text-base cursor-pointer hover:text-primary transition"
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center justify-center w-full lg:w-[calc(100%-250px)] pt-10 lg:pl-10">
                <img
                    src={heroimg}
                    alt="Hero"
                    className="max-w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
}
