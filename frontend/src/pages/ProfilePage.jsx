import React from 'react'
import ProfileCard from '../components/ProfileCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProfilePage = () => {
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
      <ProfileCard/>
      <Footer/>
    </div>
  )
}

export default ProfilePage