import React from 'react'
import { Routes, Route  } from 'react-router-dom'

import Bots from './pages/Bots'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/bots" element={<Bots />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    )
  }

  return (
    <Routes >
      <Route path="/" element={<Login />}></Route>
    </Routes>
  )
}