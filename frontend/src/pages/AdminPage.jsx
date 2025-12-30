import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Stocks from '../components/Stocks'
import Users from '../components/Users'

const AdminPage = () => {
  return (
    <div>
      <AdminNavbar/>
      <Stocks/>
      <Users/>
    </div>
  )
}

export default AdminPage