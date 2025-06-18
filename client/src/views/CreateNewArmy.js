import React, { useEffect, useState } from "react"
import CreateNewArmyValue from "../components/CreateNewArmyValue"
import Button from '../components/Button'
import InputField from "../components/InputField"
import CreateNewArmyListValue from "../components/CreateNewArmyListValue"
import statusCodes from "../static_files/statusCodes"
import "../styles/CreateNewArmy.scss"

function CreateNewArmy(props) {
  const [armyValues, setArmyValues] = useState([])

  const [armyList, setArmyList] = useState([])
  const [armyName, setArmyName] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [totalPoints, setTotalPoints] = useState(0)

  const classHierarchy = ['HQ', 'Troops', 'Elites', 'Fast Attack', 'Heavy Support', 'Dedicated Transports', 'Flyers']
  
  const addUnit = (obj) => {
    const newObj = {}
    const newArr = []

    obj['id'] = armyList.length === 0 ? 1 : Math.max(...armyList.map((el) => el.id)) + 1
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
    if(armyList.length > 0 || armyName !== "") {
      setArmyList([])
      setTotalPoints(0)
      setArmyName("")
      setStatusMessage(statusCodes.clearedSuccessfully)
  
      const timeout = setTimeout(() => {
        setStatusMessage("")
      }, 2000)
  
      return () => clearTimeout(timeout) 
    }
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

  const saveArmy = () => {
    if(armyList.length === 0) {
      setStatusMessage(statusCodes.emptyList)

      const timeout = setTimeout(() => {
        setStatusMessage("")
      }, 2000)
  
      return () => clearTimeout(timeout) 
    }

    const queryParams = new URLSearchParams(window.location.search)
    const armyId = queryParams.get("armyId")

    if(armyId === null || armyId === undefined) {
      fetch('/api/create-army', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          army_name: armyName === "" ? "default_army" : armyName,
          army_list: JSON.stringify(armyList),
          user_id: props.user.id
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setStatusMessage(data.status)
        setArmyName("")
        setArmyList([])
        setTotalPoints(0)
  
        const timeout = setTimeout(() => {
          setStatusMessage("")
        }, 2000)
    
        return () => clearTimeout(timeout) 
      })
      .catch((e) => {
        console.error(e)
      })
    } else {
      fetch('/api/update-army', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          armyId: armyId,
          armyName: armyName === "" ? "default_army" : armyName, 
          armyList: JSON.stringify(armyList)
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setStatusMessage(data.status)
  
        const timeout = setTimeout(() => {
          setStatusMessage("")
        }, 2000)
    
        return () => clearTimeout(timeout) 
      })
      .catch((e) => {
        console.error(e)
      })
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const armyId = queryParams.get("armyId")

    if(armyId !== undefined && armyId !== null) {
      fetch(`/api/get-army?armyId=${armyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {       
        setArmyName(data.armyName)
        setArmyList(JSON.parse(data.armyList))
        setTotalPoints(JSON.parse(data.armyList).reduce((totalSum, el) => totalSum + el.points, 0))
      })
      .catch((e) => {
        console.error(e)
      })
    }
  }, [])

  useEffect(() => {
    fetch('/api/armyValues')
      .then(res => res.json())
      .then(data => setArmyValues(data))
  }, [])

  return (
    <div style={{margin: "70px"}}>
      {
        classHierarchy.map((armyClass, index) => {
          return <div key={index}>
            <h3>{armyClass}</h3>
            {
              armyValues.filter(((armyValue) => armyValue.class === armyClass))
              .map((armyValue, index) => {
                return <CreateNewArmyValue key={index} value={armyValue} onClick={(obj) => addUnit(obj)} />
              })
            }
          </div>
        })
      }
      
      <div className="createNewArmySeparator">
        <hr />
      </div>

      <h3 className="createNewArmyStatusMessage">{statusMessage}</h3>

      <InputField labelInline="left" boldLabel={true} name="army-name" label="Army name:" type="text" isRequired={false} onChange={(val) => setArmyName(val)} value={armyName} />
      <h3 className="armyName">{armyName}</h3>
      {
        armyList.map((obj, index) => {
          return <CreateNewArmyListValue key={index} value={obj} deleteById={() => deleteById(obj)} />
        })
      }
      <h3 className="createNewArmyTotalPoints">Total points: {totalPoints}</h3>

      <Button margin="10px 10px 0px 0px" label="Save army" className="greenAffirmationButton" onClick={() => saveArmy()} />
      <Button margin="10px 10px 0px 0px" label="Clear list" className="alertButton" onClick={() => clearList()}/>
    </div>
  )
}

export default CreateNewArmy
