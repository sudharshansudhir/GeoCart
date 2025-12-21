import React from "react";
import logo from "../assets/GeoCart-Logo.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={logo}
            alt="GeoCart-logo"
            className="w-[45px] h-[45px] object-contain"
          />
          <span className="font-bold text-xl text-green-700">GeoCart</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6">
          <a href=""  className="relative px-3 py-1 font-medium text-gray-700 hover:text-green-700 transition
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-green-700 hover:after:w-full after:transition-all">
            Home
          </a>

          <a href="#grocery"  className="relative px-3 py-1 font-medium text-gray-700 hover:text-green-700 transition
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-green-700 hover:after:w-full after:transition-all">
            Products
          </a>

          <a href="" className="relative px-3 py-1 font-medium text-gray-700 hover:text-green-700 transition
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-green-700 hover:after:w-full after:transition-all">
            MyCart
          </a>

          <a href="#contact"  className="relative px-3 py-1 font-medium text-gray-700 hover:text-green-700 transition
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-green-700 hover:after:w-full after:transition-all">
            Contact
          </a>

          <a href="#about"  className="relative px-3 py-1 font-medium text-gray-700 hover:text-green-700 transition
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-green-700 hover:after:w-full after:transition-all">
            About
          </a>
        </div>

        {/* Profile */}
        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm">
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
