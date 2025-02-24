import React from "react";
import Title from "../Title";
import { FaShippingFast, FaHeadset, FaDollarSign } from "react-icons/fa";
import featured1 from "../../assets/featured1.png";
import featured2 from "../../assets/featured2.png";
import featured3 from "../../assets/featured3.png";
import featured4 from "../../assets/featured4.png";
import Services from "./Services";

export default function Featured() {
  return (
    <div>
      <Title title="Featured" />

      <div className="mt-4 flex items-center gap-4">
        <span className="text-xl md:text-2xl lg:text-3xl font-semibold">New Arrival</span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side - Featured 1 */}
        <div className="h-full">
          <img
            src={featured1}
            alt="Featured 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Featured 2, 3, and 4 */}
        <div className="grid grid-rows-2 gap-4">
          {/* Upper Half - Featured 2 */}
          <div>
            <img
              src={featured2}
              alt="Featured 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Lower Half - Featured 3 & 4 */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src={featured3}
              alt="Featured 3"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src={featured4}
              alt="Featured 4"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <Services />
    </div>
  );
}
