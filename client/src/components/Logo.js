import React from "react"
import logo from "../static_files/logo.png"
import "../styles/Logo.scss"

function Logo() {
  return (
    <div className="logoContainer">
      <h1>Grey Knights Army Calculator</h1>
      <img alt="logo" src={logo} width="125px" height="125px" />
    </div>
  )
}

export default Logo
