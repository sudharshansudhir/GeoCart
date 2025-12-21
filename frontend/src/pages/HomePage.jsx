import React from 'react'
import Navbar from '../components/Navbar'
import AllGrocery from '../components/AllGrocery'
import About from '../components/About'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const HomePage = () => {
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