import React, {useState, useEffect} from "react"
import "../styles/InputField.scss"

const statusCodes = require('../static_files/statusCodes')

function InputField(props) {
  const [value, setValue] = useState("")
  const [requiredMessage, setRequiredMessage] = useState("")

  useEffect(() => {
    props.updateValue(value)

    if(value === "" && props.isRequired === true) {
      setRequiredMessage(statusCodes.requiredMessage)
    } else {
      setRequiredMessage("")
    }
  }, [value])

  return (
    <div className="inputContainer">
      <label for={props.name} className="label">{props.label}</label>
      <input className="inputField" type={props.type} name={props.name} onChange={(e) => setValue(e.target.value)} value={value} />
      <span className="requiredMessage">{requiredMessage}</span>
    </div>
  )
}

export default InputField
