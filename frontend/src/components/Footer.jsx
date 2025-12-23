import React from "react";
import logo from "../assets/GeoCart-Logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-600 text-white mt-8">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="GeoCart" className="w-12 h-12" />
            <h2 className="text-2xl font-bold">GeoCart</h2>
          </div>
          <p className="text-green-100 leading-relaxed">
            Fresh groceries, daily essentials, and trusted quality delivered
            right to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-green-100">
            <li className="hover:text-yellow-300 cursor-pointer">Home</li>
            <li className="hover:text-yellow-300 cursor-pointer">Products</li>
            <li className="hover:text-yellow-300 cursor-pointer">My Cart</li>
            <li className="hover:text-yellow-300 cursor-pointer">About</li>
            <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2 text-green-100">
            <li>Vegetables</li>
            <li>Fruits</li>
            <li>Masalas</li>
            <li>Groceries</li>
            <li>Dairy Products</li>
          </ul>
        </div>

        {/* Developer & Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Developer</h3>
          <p className="text-green-100">
            By<span className="font-semibold text-yellow-300"> Team GeoCart</span>
          </p>

          <p className="text-green-100 mt-2">
            GeoCart Online Works
          </p>

          <p className="text-green-100 mt-2">
            📧 geocart.dev@gmail.com
          </p>
{/* 
          <p className="text-green-100 mt-2">
            🌐 GitHub: github.com/geocart
          </p> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-500 text-center py-4 text-green-200 text-sm">
        © {new Date().getFullYear()} GeoCart. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
