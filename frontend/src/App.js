import React, { useCallback, useEffect, useState } from 'react'
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
import Setting from './components/profileSetting/setting/Setting'
import Friends from './components/widgets/Friends/Friends'

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

  //a function that communicates with profile/userprofile/profilepicture
  const [newPic, setNewPic] = useState(null);

  const changePic=(data)=>{
    setNewPic(data)
  }

  const [allPosts, setAllPosts] = useState([]);
  const allPostFun = useCallback((data) => {
    if (!data) return;
    else if (Array.isArray(data) && data.length === 0) return;
    else if (Array.isArray(data) && allPosts.length > 0) return setAllPosts([...allPosts, ...data]);
    else if (Array.isArray(data) && data.length > 0) return setAllPosts(data);
    else {
      return setAllPosts([data, ...allPosts])
    }
  }, [allPosts])

  return (
    <Router>
      {user ? <Header newPic={newPic}/>:''}
      <Routes>
        <Route exact path='/' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/index' element={<Index allPosts={allPosts} allPostFun={allPostFun}/>} />
        <Route exact path='/verify/:token' element={<Verified />} />
        <Route exact path='/profile/:id' element={<Profile allPostFun={allPostFun} changePic={changePic}/>} />
        <Route exact path='/edit' element={<Setting changePic={changePic}/>} />
        <Route exact path='/friends/:id' element={<Friends />} />
      </Routes>
      {user ? <Footer/>:''}
    </Router>
  )
}


export default App;