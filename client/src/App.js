import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './views/Login'
import Register from './views/Register'
import Index from './views/Index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
