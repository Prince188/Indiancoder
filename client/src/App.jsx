import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Service } from './pages/Service'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Error } from './pages/Error'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import { Logout } from './pages/Logout'
import { AdminLayout } from './components/layouts/AdminLayout'
import { AdminUsers } from './pages/AdminUsers'
import { AdminContacts } from './pages/AdminContacts'
import { Profile } from './pages/Profile'
import Singleservice from './pages/Singleservice'


const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <div className='app-1'>
          <Navbar />
        </div>
        <div className='app-2' >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/service' element={<Service />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/Singleservice/:id' element={<Singleservice />} />
            <Route path='*' element={<Error />} />
            <Route path='/admin' element={<AdminLayout />} >
              <Route path='users' element={<AdminUsers />} />
              <Route path='contact' element={<AdminContacts />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App