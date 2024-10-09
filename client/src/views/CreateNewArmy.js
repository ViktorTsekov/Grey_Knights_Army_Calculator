import React, { useEffect, useState } from "react"
import CreateNewArmyValue from "../components/CreateNewArmyValue"
import Button from '../components/Button'
import InputField from "../components/InputField"
import CreateNewArmyListValue from "../components/CreateNewArmyListValue"
import statusCodes from "../static_files/statusCodes"
import "../styles/CreateNewArmy.scss"

function CreateNewArmy() {
  const [armyValues, setArmyValues] = useState([])

  const [armyList, setArmyList] = useState([])
  const [armyName, setArmyName] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [totalPoints, setTotalPoints] = useState(0)
  const [uniqueId, setUniqueId] = useState(1)

  const classHierarchy = ['HQ', 'Troops', 'Elites', 'Fast Attack', 'Heavy Support', 'Dedicated Transports', 'Flyers']
  
  const addUnit = (obj) => {
    const newObj = {}
    const newArr = []

    obj['id'] = uniqueId
    
    setUniqueId(uniqueId + 1)

    classHierarchy.map(armyClass => newObj[armyClass] = [])
    
    classHierarchy.forEach((armyClass) => {
      [...armyList, obj].forEach((armyValue) => {
        if(armyValue.class === armyClass) newObj[armyClass].push(armyValue)
      })
    })

    classHierarchy.forEach((armyClass) => {
      newObj[armyClass].sort((a, b) => {
        if(a.displayName === b.displayName) {
          return 0
        } else {
          return a.displayName > b.displayName ? 1 : -1
        }
      })
    })

    classHierarchy.forEach((armyClass) => {
      newObj[armyClass].forEach((el) => newArr.push(el))
    })

    setArmyList(newArr)
    setTotalPoints(totalPoints + obj.points)
  }

  const clearList = () => {
    setArmyList([])
    setTotalPoints(0)
    setStatusMessage(statusCodes.clearedSuccessfully)

    const timeout = setTimeout(() => {
      setStatusMessage("")
    }, 2000)

    return () => clearTimeout(timeout) 
  }

  const deleteById = (obj) => {
    const newArr = []

    armyList.forEach((el) => {
      if(el.id !== obj.id) {
        newArr.push(el)
      }
    })

    setStatusMessage(statusCodes.removedSuccessfully)

    const timeout = setTimeout(() => {
      setStatusMessage("")
    }, 2000)

    setArmyList(newArr)
    setTotalPoints(totalPoints - obj.points)

    return () => clearTimeout(timeout) 
  }

  useEffect(() => {
    fetch('/armyValues')
      .then(res => res.json())
      .then(data => setArmyValues(data))
  }, [])

  return (
    <div style={{margin: "70px"}}>
      {
        classHierarchy.map((armyClass) => {
          return <div>
            <h3>{armyClass}</h3>
            {
              armyValues.filter(((armyValue) => {
                if(armyValue.class === armyClass) return armyValue
              }))
              .map((armyValue) => {
                return <CreateNewArmyValue value={armyValue} onClick={(obj) => addUnit(obj)} />
              })
            }
          </div>
        })
      }
      
      <div className="createNewArmySeparator">
        <hr />
      </div>

      <h3 className="createNewArmyStatusMessage">{statusMessage}</h3>

      <InputField margin="10px" labelInline="left" boldLabel={true} name="army-name" label="Army name:" type="text" isRequired={false} onChange={(val) => setArmyName(val)} value={armyName} />

      {
        armyList.map((obj) => {
          return <CreateNewArmyListValue value={obj} deleteById={() => deleteById(obj)} />
        })
      }

      <h3 className="createNewArmyTotalPoints">Total points: {totalPoints}</h3>

      <Button label="Save army" className="greenAffirmationButton" onClick={() => console.log("Saved")} />
      <Button label="Clear list" className="alertButton" onClick={() => clearList()}/>
    </div>
  )
}

export default CreateNewArmy
