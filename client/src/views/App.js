import React from 'react'

function App(props) {
  return (
    <div>
      {
        props.user.name !== undefined &&
          <div style={{margin: "60px"}}>
            <h1>Hello {props.user.name}</h1>
          </div>
      }
    </div>
  )
}

export default App
