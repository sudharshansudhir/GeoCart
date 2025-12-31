import React from 'react'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ContactPage = () => {
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
      <Contact/>
      <Footer/>
      </div>
  )
}

export default ContactPage