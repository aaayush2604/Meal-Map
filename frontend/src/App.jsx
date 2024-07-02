import React, { useEffect,useState } from 'react'
import ReviewCardForm from './components/ReviewCardForm';
import { useReviewCardContext } from './Hooks/useReviewCardContext';
import { ReviewCard } from './components/ReviewCard';
import { Home } from './pages/Home';
import {Navbar} from './components/Navbar';
import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuthContext } from './Hooks/useAuthContext';
import { UserPage } from './pages/UserPage';
import {Logo} from './components/Logo';



const App = () => {
  const {user}=useAuthContext();

  return (
    <BrowserRouter>
    
    <div className='flex w-full h-screen font-[Font2]'>
      <Navbar/>
      <div className='flex flex-col h-full w-full left-16'>
      <Logo/>
      <Routes> 
          <Route path='/user' element={(user)?<UserPage/>:<Navigate to='/login'/>}></Route>
          <Route path='/login' element={!user?<Login/>:<Navigate to='/'/>}></Route>
          <Route path='/signup' element={!user?<SignUp/>:<Navigate to='/'/>}></Route>
          <Route path='/' element={<Home/>}></Route>
      </Routes>
      </div>
      </div>
    </BrowserRouter>
  )
}

export default App
