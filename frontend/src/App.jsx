import { Routes,Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import PaymentPage from './pages/PaymentPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/profile' Component={ProfilePage}/>
        <Route path='/admin' Component={AdminPage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/payment' Component={PaymentPage}/>
      </Routes>
    </>
  )
}

export default App
