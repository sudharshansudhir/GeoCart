import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import PaymentPage from './pages/PaymentPage'
import AllProducts from './pages/AllProducts'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import FloatingChatbot from "./components/FloatingChatbot";


function App() {
  const user=localStorage.getItem("isUser")


  return (
    <>
    {/* <Navbar/> */}
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/profile' Component={ProfilePage}/>
        <Route path='/checkout' Component={CheckoutPage}/>
        <Route path='/orders' Component={OrdersPage}/>
        <Route path='/allproducts' Component={AllProducts}/>
        <Route path='/cart' Component={CartPage}/>
        <Route path='/admin' Component={AdminPage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/payment' Component={PaymentPage}/>
        <Route path='/contact' Component={ContactPage}/>
        <Route path='/about' Component={AboutPage}/>
      </Routes>
      {/* <Footer/> */}
{user=="true"&&<FloatingChatbot />

}
      
    </>
  )
}

export default App
