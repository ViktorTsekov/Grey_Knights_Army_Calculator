import React, { useEffect, useState } from "react"
import ArmyValue from "../components/ArmyValue"
import Button from "../components/Button"
import "../styles/ArmyValues.scss"

function ArmyValues() {
  const [armyValues, setArmyValues] = useState([])
  const [updatedValues, setUpdatedValues] = useState([])
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    fetch('/armyValues')
      .then(res => res.json())
      .then(data => setArmyValues(data))
  }, [])

  const addToListOfChangedValues = (value, newUnitCost) => {
    const newObj = value

    newObj.costPerUnit = parseInt(newUnitCost)
    setUpdatedValues([...updatedValues.filter((el) => el.id !== value.id), newObj])
  }

  const updateChangedValues = () => {
    updatedValues.forEach(value => {
      fetch(`/armyValues/${value.id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({value})
      })
      .then(res => {
        if(res.status === 200) {
          return res.json()
        }
      })
      .then(data => {
        setUpdatedValues([])
        setStatusMessage(data.message)

        const timeout = setTimeout(() => {
          setStatusMessage("")
        }, 4000)

        return () => clearTimeout(timeout)
      })
    })
  }

  return (
    <div className="armyValuesContainer">
      {
        armyValues.length !== 0 &&
          <div>
            <h2 className="armyValuesStatusMessage">{statusMessage}</h2>
            {
              armyValues.map((value) => {
                return <ArmyValue key={value.id} value={value} addToListOfChangedValues={addToListOfChangedValues} />
              })
            }
            <Button label="Save" className="greenAffirmationButton" onClick={() => updateChangedValues()} />
          </div>
      }
      {
        armyValues.length === 0 &&
          <h2>No values to display</h2>
      }
    </div>
  )
}

export default ArmyValues
