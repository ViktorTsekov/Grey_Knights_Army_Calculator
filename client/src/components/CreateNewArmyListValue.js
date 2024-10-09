import React from "react"
import Button from '../components/Button'
import "../styles/CreateNewArmyValue.scss"

function CreateNewArmyListValue(props) {
  return (
    <div className="createNewArmyContainer">
      <span className="listName">{props.value.displayName}</span>
      <Button label="Remove" className="alertButton" onClick={() => props.deleteById(props.value)} />
    </div>
  )
}

export default CreateNewArmyListValue
