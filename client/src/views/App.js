import React from 'react'
import Button from '../components/Button'

function App(props) {
  return (
    <div>
      {
        props.user.name !== undefined &&
          <div style={{margin: "60px"}}>
            <h1>Hello {props.user.name}</h1>
            <Button margin="0" label="New army" className="greenAffirmationButton" onClick={() => window.location.href = "/create-new-army"}/>
          </div>
      }
    </div>
  )
}

export default App
