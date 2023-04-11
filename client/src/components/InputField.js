import React, {useState, useEffect} from "react"

function InputField(props) {
  const [value, setValue] = useState("")
  const [showRequiredWarning, setShowRequiredWarning] = useState(false)

  const requiredMessage = "field is required"

  useEffect(() => {
    props.updateValue(value)

    if(value === "") {
      setShowRequiredWarning(true)
    } else {
      setShowRequiredWarning(false)
    }
  }, [value])

  return (
    <div style={{margin: "8px"}}>
      <label for={props.name} style={{marginRight: "6px"}}>{props.label}</label>
      <input type={props.type} name={props.name} onChange={(e) => setValue(e.target.value)} value={value} />
      {
        showRequiredWarning && props.isRequired &&
          <span style={{color: "#b00202", marginLeft: "6px"}}>{requiredMessage}</span>
      }
    </div>
  )
}

export default InputField
