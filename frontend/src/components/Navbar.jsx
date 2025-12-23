import React, { useContext } from "react";
import logo from "../assets/GeoCart-Logo.png";
import { NavLink } from "react-router-dom";
import {  AppProvider } from "../context/Context";

const Navbar = () => {
  const {login,setLogin}=useContext(AppProvider)
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

        {/* NavLinks */}
        <div className="flex items-center gap-6">
          <NavLink to="/"  className={({ isActive }) => isActive ? 'active-link' : 'nav-hover' }>
            Home
          </NavLink>

          <NavLink to="/allproducts"  className={({ isActive }) => isActive ? 'active-link' : 'nav-hover' }>
            AllProducts
          </NavLink>

          <NavLink to="/cart"  className={({ isActive }) => isActive ? 'active-link' : 'nav-hover' }>
            MyCart
          </NavLink>

          <NavLink to="/contact"   className={({ isActive }) => isActive ? 'active-link' : 'nav-hover' }>
            Contact
          </NavLink>

          <NavLink to="/about"  className={({ isActive }) => isActive ? 'active-link' : 'nav-hover' }>
            About
          </NavLink>
        </div>

        {/* Profile */}
        {login ?
        <div>
          <NavLink className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm">
            Profile
          </NavLink>
        </div>:
        <div>
          <NavLink to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm">
            Login
          </NavLink>
        </div>
}
      </div>
    </nav>
  );
};

export default Navbar;
