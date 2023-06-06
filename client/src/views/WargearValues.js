import React, {useState, useEffect} from "react"
import WargearValue from "../components/WargearValue"
import Button from "../components/Button"
import "../styles/WargearValues.scss"

function WargearValues() {
  const [wargearValues, setWargearValues] = useState([])
  const [updatedValues, setUpdatedValues] = useState([])
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    fetch('/wargearValues')
      .then(res => res.json())
      .then(data => setWargearValues(data))
  }, [])

  const addToListOfChangedValues = (value, newUnitCost) => {
    const newObj = value

    newObj.cost = parseInt(newUnitCost)
    setUpdatedValues([...updatedValues.filter((el) => el.id !== value.id), newObj])
  }

  const updateChangedValues = () => {
    updatedValues.forEach(value => {
      fetch(`/wargearValues/${value.id}`, {
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
    <div className="wargearValuesContainer">
      {
        wargearValues.length !== 0 &&
          <div>
            <h2 className="wargearValuesStatusMessage">{statusMessage}</h2>
            {
              wargearValues.map((value) => {
                return <WargearValue key={value.id} value={value} addToListOfChangedValues={addToListOfChangedValues} />
              })
            }
            <Button label="Save" className="greenAffirmationButton" onClick={() => updateChangedValues()} />
          </div>
      }
      {
        wargearValues.length === 0 &&
          <h2>No values to display</h2>
      }
    </div>
  )
}

export default WargearValues
