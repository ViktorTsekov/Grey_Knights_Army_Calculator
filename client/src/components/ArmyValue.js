import React, { useState } from "react"
import "../styles/ArmyValue.scss"

function ArmyValue(props) {
  const [unitCost, setUnitCost] = useState(props.value.costPerUnit)

  const verifyUnitCost = (value) => {
    if(Number(value) >= 0 && Number(value) <= 999) {
      setUnitCost(parseInt(value).toString())
      props.addToListOfChangedValues(props.value, value)
    }
  }

  return (
    <div style={{margin: '10px'}}>
      <span className="inlineInformation">{props.value.name}</span>
      <span className="inlineInformation">class: {props.value.class}</span>
      <span className="inlineInformation">squad size: {props.value.unitSize}</span>
      <span className="costPerUnit">{"cost per unit:"} <input value={unitCost} onChange={(e) => verifyUnitCost(e.target.value)} type="number" className="costPerUnitInput" /></span>
    </div>
  )
}

export default ArmyValue
