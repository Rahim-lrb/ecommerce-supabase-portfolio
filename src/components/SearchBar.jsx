import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar() {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log("Search query:", query);
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="relative w-full max-w-lg">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="What are you looking for?"
                    className="w-full py-2 pl-4 pr-12 bg-[#F5F5F5] rounded-sm placeholder-opacity-50 placeholder:text-sm outline-none"
                />

                <Search
                    size={24}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-60"
                />
            </div>
        </div>
    );
}

export default SearchBar;
