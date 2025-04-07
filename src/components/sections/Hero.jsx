import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroimg from "../../assets/heroimg.png";
import supabase from "../../supabaseClient";

export default function Hero() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data, error } = await supabase.from("category").select("*");
                if (error) throw error;
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Sidebar for Categories */}
            <div className="hidden lg:flex flex-col w-[250px] border-r border-secondary h-full">
                <ul className="space-y-4 pt-8 pr-10">
                    {loading
                        ? Array(6).fill(0).map((_, index) => (
                              <li key={index} className="h-5 w-32 bg-gray-300 animate-pulse rounded"></li>
                          ))
                        : categories.map((category) => (
                              <li key={category.id}>
                                  <Link
                                      to={`/category/${category.name}`}
                                      className="text-base cursor-pointer hover:text-primary transition"
                                  >
                                      {category.name}
                                  </Link>
                              </li>
                          ))}
                </ul>
            </div>

            {/* Hero Image Section */}
            <div className="flex items-center justify-center w-full lg:w-[calc(100%-250px)] pt-10 lg:pl-10">
                <img src={heroimg} alt="Hero" className="max-w-full h-auto rounded-lg" />
            </div>
        </div>
    );
}
