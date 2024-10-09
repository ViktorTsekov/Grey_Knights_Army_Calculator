import React from 'react'
import '../styles/Button.scss'

function Button(props) {
  return (
    <button style={{margin: `${props.margin}`}} className={props.className === undefined ? "default" : props.className} onClick={() => props.onClick()}>{props.label}</button>
  )
}

export default Button
