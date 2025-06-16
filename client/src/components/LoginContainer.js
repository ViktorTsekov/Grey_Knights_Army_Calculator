import React from "react"
import "../styles/LoginContainer.scss"
import Logo from "./Logo"

function LoginContainer(props) {
  return (
    <div>
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
