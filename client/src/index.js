import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/Login'
import Register from './views/Register'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
