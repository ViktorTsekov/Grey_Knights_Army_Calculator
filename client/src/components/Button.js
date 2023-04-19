import React from 'react'
import '../styles/Button.scss'

function Button(props) {
  return (
    <button className={props.className === undefined ? "default" : props.className} onClick={() => props.onClick()} style={{margin: props.margin}}>{props.label}</button>
  )
}

export default Button
