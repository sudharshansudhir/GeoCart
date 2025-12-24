import React from 'react'
import AllGrocery from '../components/AllGrocery'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AllProducts = () => {
  return (
    <div>
      <Navbar/>
        <AllGrocery/>
      <Footer/>
    </div>
  )
}

export default AllProducts