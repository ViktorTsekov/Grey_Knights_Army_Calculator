import React, { useState } from "react"
import "../styles/WargearValue.scss"

function WargearValue(props) {
  const [unitCost, setUnitCost] = useState(props.value.cost)

  const verifyUnitCost = (value) => {
    if(Number(value) >= 0 && Number(value) <= 999) {
      setUnitCost(parseInt(value).toString())
      props.addToListOfChangedValues(props.value, value)
    }
  }

  return (
    <div className="wargearValueContainer">
      <span className="wargearName">{props.value.name}</span>
      <span className="wargearCost">{"cost:"} <input value={unitCost} onChange={(e) => verifyUnitCost(e.target.value)} type="number" className="wargearCostInput" /></span>
    </div>
  )
}

export default WargearValue
