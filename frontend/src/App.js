import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { loadUser } from './action/userAction'
import "./App.css"
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Verified from './components/Auth/Verify/Verify.js'
import Index from './components/Index/Index'
import Header from './components/Layouts/Header/header.js'
import useLocalStorage from './utils/useLocalStorage'
import Footer from './components/Layouts/footer/Footer.js'
import Profile from './components/Profile/Profile'
import { socketConnection } from './action/socketAction'

function App() {

  const [local, setlocal] = useLocalStorage('user');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadUser());
    dispatch(socketConnection())
  }, [dispatch])

  useEffect(() => {
    user ? setlocal(user) : setlocal(null)
  }, [user, local, setlocal])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/index' element={<Index />} />
        <Route exact path='/verify/:token' element={<Verified />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
      <Footer/>
    </Router>
  )
}


export default App;