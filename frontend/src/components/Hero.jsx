import React from "react";
import hero from "../assets/hero.jpg";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] rounded-xl overflow-hidden">
      
      {/* Background Image */}
      <img
        src={hero}
        alt="Fresh groceries"
        className="w-full h-full object-cover scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-10 md:px-20 max-w-xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Fresh Groceries
            <span className="text-green-400"> Delivered</span> <br />
            To Your Doorstep
          </h1>

          <p className="mt-4 text-gray-200 text-sm md:text-base">
            Shop vegetables, fruits, masalas and daily essentials at the
            best price — fresh, fast, and reliable.
          </p>

          {/* NavLinks */}
          <div className="mt-6 flex gap-4">
            <NavLink to="/allproducts" className="bg-green-600 px-6 py-3 rounded-lg font-semibold
                               hover:bg-green-700 transition shadow-lg">
              Shop Now
            </NavLink>

            <NavLink to="/allproducts" className="border border-white px-6 py-3 rounded-lg font-semibold
                               hover:bg-white hover:text-black transition">
              Explore
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
