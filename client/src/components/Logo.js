import React from "react"
import logo from "../static_files/logo.png"
import "../styles/Logo.scss"

function Logo() {
  return (
    <div className="logoContainer">
      <p id="title">Grey Knights Army Calculator</p>
      <img alt="logo" id="logo" src={logo} />
    </div>
  )
}

export default Logo
