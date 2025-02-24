import React from "react";
import maker1 from "../assets/About/founder1.png";
import maker2 from "../assets/About/founder2.png";
import maker3 from "../assets/About/founder3.png";
import about from "../assets/About/about.png";
import Stat from "../assets/About/Stat.png";
import Stat2 from "../assets/About/Stat2.png";
import Stat3 from "../assets/About/Stat3.png";
import Stat4 from "../assets/About/Stat4.png";
import Services from "../components/Services";


import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function About() {
  const makers = [
    {
      name: "John Doe",
      role: "Founder & Chairman",
      image: maker1,
      twitter: "https://twitter.com",
      instagram: "https://www.instagram.com",
      linkedin: "https://www.linkedin.com"
    },
    {
      name: "Jane Smith",
      role: "Co-Founder & CEO",
      image: maker2,
      twitter: "https://twitter.com",
      instagram: "https://www.instagram.com",
      linkedin: "https://www.linkedin.com"
    },
    {
      name: "Michael Brown",
      role: "Chief Marketing Officer",
      image: maker3,
      twitter: "https://twitter.com",
      instagram: "https://www.instagram.com",
      linkedin: "https://www.linkedin.com"
    }
  ];

  return (
    <div className="py-16">
      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-28 gap-16">
        <div className="md:w-1/2 pl-26">
          <h2 className="text-5xl font-medium mb-20">Our Story</h2>
          <p className="mb-8 opacity-90">Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions,Exclusive has 10,500 sellers and 300 brands, serving 3 million customers across the region. </p>
          <p className="opacity-90">Exclusive has more than 1 million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer to electronics, fashion, home goods, and more.</p>
        </div>

        <div className="mt-10 md:mt-0 md:w-1/2">
          <img src={about} alt="Our Story Image" className="w-[#705px] h-[#609px]"/>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="my-20 flex flex-col md:flex-row items-center justify-between gap-6 text-center px-6 md:px-26 ">
        <div className="flex flex-col items-center border-1 border-gray-300 p-8 rounded-md">
          <img src={Stat} alt="Services 1" className="w-14 h-14" />
          <h3 className="mt-3 text-lg font-semibold">10.5K</h3>
          <p className="text-sm text-gray-600">Sellers Active</p>
        </div>
        <div className="flex flex-col items-center border-1 border-gray-300 p-8 rounded-md">
          <img src={Stat2} alt="Services 2" className="w-14 h-14" />
          <h3 className="mt-3 text-lg font-semibold">3 Million</h3>
          <p className="text-sm text-gray-600">customers</p>
        </div>
        <div className="flex flex-col items-center border-1 border-gray-300 p-8 rounded-md">
          <img src={Stat3} alt="Services 3" className="w-14 h-14" />
          <h3 className="mt-3 text-lg font-semibold">1 Million+</h3>
          <p className="text-sm text-gray-600">Products Available</p>
        </div>
        <div className="flex flex-col items-center border-1 border-gray-300 p-8 rounded-md">
          <img src={Stat4} alt="Services 4" className="w-14 h-14" />
          <h3 className="mt-3 text-lg font-semibold">25k</h3>
          <p className="text-sm text-gray-600">Annual Gross Sales</p>
        </div>
      </div>

      {/* Makers Section */}
      <div className="my-48 grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-26 ">
        {makers.map((maker, index) => (
          <div key={index} className="flex flex-col">
            <img
              src={maker.image}
              alt={`Maker ${index + 1}`}
              className="w-[#350px] h-[400px] object-cover mb-4 rounded-md"
            />
            <h3 className="text-2xl font-medium">{maker.name}</h3>
            <p className="text-sm text-gray-600">{maker.role}</p>
            <div className="flex gap-4 mt-4">
              <a href={maker.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-700 w-5 h-5" />
              </a>
              <a href={maker.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-700 w-5 h-5" />
              </a>
              <a href={maker.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-gray-700 w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 md:px-26 ">
        <Services/>
      </div>
    </div>
  );
}
