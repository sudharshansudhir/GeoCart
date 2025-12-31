import React from 'react'

import logo from "../assets/GeoCart-Logo.png"
import { NavLink, useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
//   const navigate=useNavigate()
  async function logouthandle(){
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("isUser")
    navigate("/login")
  }
  return (
    <div className='flex p-2 bg-green-300 justify-between top-0 fixed w-full z-20 items-center'>
        <img src={logo} alt="logo" className='w-20'  />
        <div className='text-3xl text-black font-bold'>ADMIN DASHBOARD</div>
        <NavLink to="/login" onClick={()=>logouthandle()} className="px-3 py-1 border border-black rounded-md bg-green-700 hover:bg-[#c10404ff] hover-border-[#000000] text-xl">Logout</NavLink>
    </div>
  )
}

export default AdminNavbar