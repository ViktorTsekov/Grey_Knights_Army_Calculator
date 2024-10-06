import React, {useState, useEffect} from "react"
import "../styles/InputField.scss"

const statusCodes = require('../static_files/statusCodes')

function InputField(props) {
  const [requiredMessage, setRequiredMessage] = useState("")

  useEffect(() => {
    if(props.value === "" && props.isRequired === true) {
      setRequiredMessage(statusCodes.requiredMessage)
    } else {
      setRequiredMessage("")
    }
  }, [props.value, props.isRequired])

  return (
    <div style={{margin: `${props.margin}`}}  className="inputContainer">
      <label style={{textAlign: `${props.labelInline}`}} htmlFor={props.name} className="label">{props.label}</label>
      <input className="inputField" type={props.type} name={props.name} onChange={(e) => props.onChange(e.target.value)} value={props.value} />
      <span className="requiredMessage">{requiredMessage}</span>
    </div>
  )
}

export default InputField
