import React from 'react'
import logo from "../assets/GeoCart-Logo.png"

const Navbar = () => {
  return (<div className='p-2'>
    <div className='flex justify-between items-center gap-2 text-[20px]'>
        <div>
            <img src={logo} alt="GeoCart-logo" className='w-[50px] h-[50px]'/>
        </div>
        <div className='flex justify-between items-center gap-10'>
            <div>Home</div>
            <div>Products</div>
            <div>MyCart</div>
            <div>Contact Us</div>
            <div>About</div>
        </div>
        <div>
            <div className='rounded-md py-2 px-2 bg-green-600'>Profile</div>
        </div>
    </div>
</div>
  )
}

export default Navbar