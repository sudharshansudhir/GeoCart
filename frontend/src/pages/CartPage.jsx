import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyCart from '../components/MyCart'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
      const navigate=useNavigate()
  const isUser=localStorage.getItem("isUser")
  const isAdmin=localStorage.getItem("isAdmin")
  useEffect(()=>{
    if(isAdmin=="true"){
      navigate("/admin")
    }
    if(!isUser){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <Navbar/>
      <MyCart/>
    <Footer/>
    </div>
  )
}

export default CartPage