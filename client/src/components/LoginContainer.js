import React from "react"
import colors from "../static files/colors"

function LoginContainer(props) {
  return (
    <div style={{padding: "24px", border: "2px solid black", borderRadius: "10px", width: "500px", backgroundColor: `${colors.lightGreyBackground}`, textAlign: "center", position: "absolute", top: "25%", left: "30%"}}>
      {props.children}
    </div>
  )
}

export default LoginContainer
