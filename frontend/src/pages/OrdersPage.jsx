import React from 'react'
import UserOrderList from '../components/UserOrderList'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OrdersPage = () => {
  return (
    <div>
        <Navbar/>
        <UserOrderList/>
        <Footer/>
    </div>
  )
}

export default OrdersPage