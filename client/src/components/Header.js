import React from "react"
import logo from "../static_files/logo.png"
import "../styles/Header.scss"

function Header(props) {
  return (
    <div>
      <header>
        <ul>
          <a href='/'>
            <img alt="logo" src={logo} width="60px" height="60px" />
          </a>
          <a href='/'>Home</a>
          {
            props.user.role === "admin" &&
              <a href='/users'>Edit Users</a>
          }
          {
            props.user.role === "admin" &&
              <a href='/'>Edit Army's Values</a>
          }
          <a href='/login' onClick={() => fetch("/logout")}>Log Out</a>
        </ul>
      </header>
    </div>
  )
}

export default Header
