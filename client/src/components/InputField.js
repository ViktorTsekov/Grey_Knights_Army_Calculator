import React, {useState, useEffect} from "react"
import "../styles/InputField.scss"

function InputField(props) {
  const [value, setValue] = useState("")
  const [showRequiredWarning, setShowRequiredWarning] = useState(false)

  const requiredMessage = "required"

  useEffect(() => {
    props.updateValue(value)

    if(value === "") {
      setShowRequiredWarning(true)
    } else {
      setShowRequiredWarning(false)
    }
  }, [value])

  return (
    <div className="inputContainer">
      <label for={props.name} className="label">{props.label}</label>
      <input type={props.type} name={props.name} onChange={(e) => setValue(e.target.value)} value={value} />
      {
        showRequiredWarning && props.isRequired &&
          <span className="requiredMessage">{requiredMessage}</span>
      }
    </div>
  )
}

export default InputField
