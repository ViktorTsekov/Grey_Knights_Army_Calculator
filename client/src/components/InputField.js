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
      {
        props.boldLabel === true &&
          <h3 style={{textAlign: `${props.labelInline}`, width: `${props.labelWidth}`}} htmlFor={props.name} className="label">{props.label}</h3>
      }
      {
        (props.boldLabel === false || props.boldLabel === undefined) &&
          <span style={{textAlign: `${props.labelInline}`}} htmlFor={props.name} className="label">{props.label}</span>
      }
      <input className="inputField" type={props.type} name={props.name} onChange={(e) => props.onChange(e.target.value)} value={props.value} />
      <span className="requiredMessage">{requiredMessage}</span>
    </div>
  )
}

export default InputField
