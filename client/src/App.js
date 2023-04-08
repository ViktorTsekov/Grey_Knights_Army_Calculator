import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './views/Login'
import Register from './views/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
