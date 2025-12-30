import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Stocks from '../components/Stocks'
import Users from '../components/Users'
import AddItem from '../components/AddItem'

const AdminPage = () => {
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