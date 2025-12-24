import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import PaymentPage from './pages/PaymentPage'
import AllProducts from './pages/AllProducts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'

function App() {

  return (
    <>
    {/* <Navbar/> */}
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/profile' Component={ProfilePage}/>
        <Route path='/allproducts' Component={AllProducts}/>
        <Route path='/cart' Component={CartPage}/>
        <Route path='/admin' Component={AdminPage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/payment' Component={PaymentPage}/>
        <Route path='/contact' Component={ContactPage}/>
        <Route path='/about' Component={AboutPage}/>
      </Routes>
      {/* <Footer/> */}
    </>
  )
}

export default App
