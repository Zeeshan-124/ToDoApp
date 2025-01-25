import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import UserSignup from './Pages/UserSignup'
import UserLogin from './Pages/UserLogin'
import UserProtectedWraper from './Pages/UserProtectedWrapper'
import UserLogout from './Pages/UserLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='/user/signup' element={<UserSignup />} />
        <Route path='/user/logout' element={
            <UserLogout />
        } />
        <Route path='/home' element={
          <UserProtectedWraper>
            <HomePage />
          </UserProtectedWraper>
        } />
      </Routes>
    </div>
  )
}

export default App