import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Stocks from '../components/Stocks'
import Users from '../components/Users'
import AddItem from '../components/AddItem'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AdminPage = () => {
    const navigate=useNavigate()
  // const isUser=localStorage.getItem("isUser")
  const isAdmin=localStorage.getItem("isAdmin")
  useEffect(()=>{
    console.log(isAdmin)
    if(!isAdmin || isAdmin=="false"){
      navigate("/")
    }
  },[])
  return (
    <div>
      <AdminNavbar/>
      <Stocks/>
      <Users/>
      <AddItem/>
    </div>
  )
}

export default AdminPage