import React from 'react'
import services1 from "../assets/Services.png"
import services2 from "../assets/Services2.png"
import services3 from "../assets/Services3.png"

export default function Services() {
    return (
        <div className="my-20 flex flex-col md:flex-row items-center justify-between gap-6 text-center">
            {/* Free and Fast Delivery */}
            <div className="flex flex-col items-center">
                {/* <FaShippingFast className="w-14 h-14 text-white bg-black p-3 rounded-full" /> */}
                <img src={services1} alt="Services 1" className="w-14 h-14" />
                <h3 className="mt-3 text-lg font-semibold">Free & Fast Delivery</h3>
                <p className="text-sm text-gray-600">Free delivery for all orders under $140</p>
            </div>

            {/* Customer Service */}
            <div className="flex flex-col items-center">
                {/* <FaHeadset className="w-14 h-14 text-white bg-black p-3 rounded-full" /> */}
                <img src={services2} alt="Services 1" className="w-14 h-14" />
                <h3 className="mt-3 text-lg font-semibold">24/7 Customer Service</h3>
                <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
            </div>

            {/* Money Back Guarantee */}
            <div className="flex flex-col items-center">
                {/* <FaDollarSign className="w-14 h-14 text-white bg-black p-3 rounded-full" /> */}
                <img src={services3} alt="Services 1" className="w-14 h-14" />
                <h3 className="mt-3 text-lg font-semibold">Money-Back Guarantee</h3>
                <p className="text-sm text-gray-600">Worry-free shopping, 30-day refund</p>
            </div>
        </div>
    )
}
