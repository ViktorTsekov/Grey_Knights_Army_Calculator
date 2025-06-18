import React, { useState } from "react"
import Button from '../components/Button'
import SelectButton from "./SelectButton"
import statusCodes from "../static_files/statusCodes"
import "../styles/CreateNewArmyValue.scss"

function CreateNewArmyValue(props) {
  const [squadSize, setSquadSize] = useState(props.value.unitSize.split("-")[0]) // Set default value
  const [statusMessage, setStatusMessage] = useState("")

  const clickEvent = () => {
    let unitName = ""
    let points = squadSize * props.value.costPerUnit

    if(squadSize > 1) {
      unitName = `${squadSize} X ${props.value.name} (${points} points)`
    } else {
      unitName = `${props.value.name} (${points} points)`
    }

    let object = {
      displayName: unitName,
      points: points,
      class: props.value.class
    }

    setStatusMessage(statusCodes.addedSuccessfully)

    const timeout = setTimeout(() => {
      setStatusMessage("")
    }, 2000)

    props.onClick(object)

    return () => clearTimeout(timeout)
  }

  return (
    <div className="createNewArmyContainer">
      <span className="unitName">{props.value.name}</span>
      <span className="costPerUnit">{`(${props.value.costPerUnit} points per unit)`}</span>
      <span className="squadSize">{"squad size:"} <SelectButton onChange={(e) => setSquadSize(e)} name="squad_size" options={props.value.unitSize.split("-")} /> </span>
      <Button label="Add" className="greenAffirmationButton" onClick={() => clickEvent()} />
      <span className="statusMessage" style={{color: "green"}}>{statusMessage}</span>
    </div>
  )
}

export default CreateNewArmyValue
