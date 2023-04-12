import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/retrieveCurrentUser")
      .then(res => res.json())
      .then(data => {
        if(data.user === undefined) {
          navigate("/login")
        } else {
          setUsername(data.user.name)
        }
      })
  }, [navigate])

  const logOut = () => {
    fetch("/logout")
    navigate("/login")
  }

  return (
    <div>
      <header>
      
      </header>
      <div>
        {
          username !== "" &&
            <div>
              <h1>Hello {username}</h1>
              <button onClick={() => logOut()}>Log Out</button>
            </div>
        }
      </div>
    </div>

  )
}

export default App
