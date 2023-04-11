import React from 'react'
import '../styles/Button.css'
import colors from '../static files/colors'

function Button(props) {
  return (
    <button onClick={() => props.onClick()} style={{margin: "10px", width: "100px", padding: "8px", backgroundColor: `${colors.darkGreyBackground}`, border: "2px solid black", borderRadius: "8px", cursor: "pointer", color: "#dbdbdb"}}>{props.label}</button>
  )
}

export default Button
