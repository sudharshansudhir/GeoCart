import React from 'react'
import Navbar from '../components/Navbar'
import AllGrocery from '../components/AllGrocery'
import About from '../components/About'
import Contact from '../components/Contact'

const HomePage = () => {
  return (
    <div className='m-2'>
      <Navbar/>
      <AllGrocery/>
      <About/>
      <Contact/>
    </div>
  )
}

export default HomePage