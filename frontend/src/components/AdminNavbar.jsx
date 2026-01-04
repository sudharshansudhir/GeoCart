import React from "react";
import logo from "../assets/GeoCart-Logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  function logouthandle() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="fixed top-0 z-20 w-full bg-green-300 px-4 py-2 flex items-center justify-between">
      <img src={logo} alt="logo" className="w-14 md:w-20" />

      <div className="text-lg md:text-3xl font-bold text-black text-center flex-1">
        ADMIN DASHBOARD
      </div>

      <NavLink
        to="/login"
        onClick={logouthandle}
        className="px-3 py-1 bg-green-700 text-white rounded-md text-sm md:text-lg hover:bg-red-600"
      >
        Logout
      </NavLink>
    </div>
  );
};

export default AdminNavbar;
