import React from 'react'
import '../styles/Button.scss'

function Button(props) {
  return (
    <button onClick={() => props.onClick()}>{props.label}</button>
  )
}

export default Button
