import React from 'react'
import Navbar from '../components/Navbar'
import AllGrocery from '../components/AllGrocery'
import About from '../components/About'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate=useNavigate()
  const isUser=localStorage.getItem("isUser")  
  const isAdmin=localStorage.getItem("isAdmin")
  useEffect(()=>{
    if(isUser=="false" && isAdmin=="true"){
      navigate("/admin")
    }
  },[])
  return (
    <div className='m-2'>
      <Navbar/>
      <Hero/>
      <AllGrocery/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default HomePage