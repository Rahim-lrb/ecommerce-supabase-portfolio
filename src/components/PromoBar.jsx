import React from "react";
import { ArrowDown } from "lucide-react"; // Import the ArrowDown icon

export default function PromoBar() {
  return (
    <div className="bg-black text-white py-2 px-6 sm:px-8">
      <div className="flex justify-between items-center w-full">
        {/* Left Side: Promo text and Shop Now */}
        <div className="flex items-center justify-center space-x-2 flex-1">
          <p className="text-xs sm:text-sm text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <p className="text-xs sm:text-sm cursor-pointer ml-2 border-b border-white">
            Shop Now
          </p>
        </div>

        {/* Right Side: Language and Arrow */}
        <div className="flex items-center space-x-2">
          <p className="text-xs sm:text-sm">English</p>
          <ArrowDown size={16} color="white" />
        </div>
      </div>
    </div>
  );
}
