import React from 'react'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AboutPage = () => {
    const navigate=useNavigate()
    const isUser=localStorage.getItem("isUser")    
  const isAdmin=localStorage.getItem("isAdmin")
    useEffect(()=>{
      if((isUser=="false") && isAdmin=="true"){
        navigate("/admin")
      }
    },[])
  return (
    <div>
      <Navbar/>
      <About/>
      <Footer/>
      </div>
  )
}

export default AboutPage