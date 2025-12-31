import React from 'react'
import AllGrocery from '../components/AllGrocery'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AllProducts = () => {
    const navigate=useNavigate()
  const isUser=localStorage.getItem("isUser")
  const isAdmin=localStorage.getItem("isAdmin")

  useEffect(()=>{
    if(isAdmin=="true" && isUser=="false"){
      navigate("/admin")
    }
  },[])
  return (
    <div>
      <Navbar/>
        <AllGrocery/>
      <Footer/>
    </div>
  )
}

export default AllProducts