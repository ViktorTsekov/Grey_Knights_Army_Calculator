import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './views/Login'
import Register from './views/Register'
import ViewWithHeader from './components/ViewWithHeader'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewWithHeader viewName="Home" />} />
          <Route path="/users" element={<ViewWithHeader viewName="Users" />} />
          <Route path="/army-values" element={<ViewWithHeader viewName="ArmyValues" />} />
          <Route path="/wargear-values" element={<ViewWithHeader viewName="WargearValues" />} />
          <Route path="/create-new-army" element={<ViewWithHeader viewName="CreateNewArmy" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </div>
);
