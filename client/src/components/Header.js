import React from "react"
import logo from "../static_files/logo.png"
import { Link } from 'react-router-dom';
import "../styles/Header.scss"

function Header(props) {
  return (
    <div className="headerContainer">
      <header>
        <ul>
          <Link to='/'>
            <img id="headerLogo" alt="logo" src={logo} />
          </Link>
          <Link to='/'>Home</Link>
          {
            props.user.role === "admin" &&
              <Link to='/users'>Edit Users</Link>
          }
          {
            props.user.role === "admin" &&
              <Link to='/army-values'>Edit Army's Values</Link>
          }
          {
            props.user.role === "admin" &&
              <Link to='/wargear-values'>Edit Wargear's Values</Link>
          }
          <Link to='/login' onClick={() => fetch("/api/logout")}>Log Out</Link>
        </ul>
      </header>
    </div>
  )
}

export default Header
