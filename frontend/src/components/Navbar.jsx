import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/GeoCart-Logo.png";
import { NavLink } from "react-router-dom";
import { AppProvider } from "../context/Context";

const Navbar = () => {
  const { login, setLogin } = useContext(AppProvider);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isloggedin = localStorage.getItem("token");
    if (isloggedin) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={logo}
            alt="GeoCart-logo"
            className="w-10 h-10 sm:w-[45px] sm:h-[45px] object-contain"
          />
          <span className="font-bold text-lg sm:text-xl text-green-700">
            GeoCart
          </span>
        </div>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "nav-hover"}>
            Home
          </NavLink>

          <NavLink to="/allproducts" className={({ isActive }) => isActive ? "active-link" : "nav-hover"}>
            AllProducts
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => isActive ? "active-link" : "nav-hover"}>
            MyCart
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : "nav-hover"}>
            Contact
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : "nav-hover"}>
            About
          </NavLink>

          {login && (
            <NavLink to="/orders" className={({ isActive }) => isActive ? "active-link" : "nav-hover"}>
              My Orders
            </NavLink>
          )}
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block">
          {login ? (
            <NavLink
              to="/profile"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm px-4 py-4 space-y-4">

          <NavLink onClick={() => setMenuOpen(false)} to="/" className="block nav-hover">
            Home
          </NavLink>

          <NavLink onClick={() => setMenuOpen(false)} to="/allproducts" className="block nav-hover">
            AllProducts
          </NavLink>

          <NavLink onClick={() => setMenuOpen(false)} to="/cart" className="block nav-hover">
            MyCart
          </NavLink>

          <NavLink onClick={() => setMenuOpen(false)} to="/contact" className="block nav-hover">
            Contact
          </NavLink>

          <NavLink onClick={() => setMenuOpen(false)} to="/about" className="block nav-hover">
            About
          </NavLink>

          {login && (
            <NavLink onClick={() => setMenuOpen(false)} to="/orders" className="block nav-hover">
              My Orders
            </NavLink>
          )}

          <div className="pt-3 border-t">
            {login ? (
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/profile"
                className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Profile
              </NavLink>
            ) : (
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/login"
                className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
