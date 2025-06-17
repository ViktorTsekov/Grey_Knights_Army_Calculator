import React from "react"
import "../styles/LoginContainer.scss"
import Logo from "./Logo"

function LoginContainer(props) {
  return (
    <div className="logoLoginContainer">
      <div>
        <Logo />
      </div>
      <div className="loginContainer">
        {props.children}
      </div>
    </div>
  )
}

export default LoginContainer
