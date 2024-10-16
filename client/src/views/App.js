import React, {useState, useEffect} from 'react'
import Button from '../components/Button'
import ArmyViewValue from '../components/ArmyViewValue'

function App(props) {
  const [armies, setArmies] = useState([])
  const [statusMessage, setStatusMessage] = useState("")

  const deleteById = (id) => {
    fetch('/delete-army', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        armyId: id
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((data) => {
      setArmies(armies.filter(el => el.id !== id))
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

  useEffect(() => {
    fetch(`/get-armies?userId=${props.user.id}`)
      .then((res) => {
        if(res.ok) {
          return res.json()
        }
      }).then((data) => {
        setArmies(data)
      }).catch((e) => {
        console.log(e)
      })
  }, [props.user.id])

  return (
    <div style={{margin: "70px"}}>
      {
        props.user.name !== undefined &&
          <div>
            <h1>Hello {props.user.name}</h1>
          </div>
      }
      <h3 style={{color: "green"}}>{statusMessage}</h3>
      {
        armies.map((el, index) => {
          return <ArmyViewValue key={index} deleteById={deleteById} armyValue={el} />
        })
      }
      <Button margin="0" label="New army" className="greenAffirmationButton" onClick={() => window.location.href = "/create-new-army"}/>
    </div>
  )
}

export default App
