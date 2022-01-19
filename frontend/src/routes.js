import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
    </Routes>
  )
}