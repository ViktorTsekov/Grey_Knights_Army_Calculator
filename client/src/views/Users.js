import React, { useEffect, useState } from "react"
import User from "../components/User"
import "../styles/Users.scss"

function Users(props) {
  const [statusMessage, setStatusMessage] = useState("")
  const [users, setUsers] = useState([])

  const removeUserFromCurrentView = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  useEffect(() => {
    fetch('/clients')
      .then(res => res.json())
      .then(data => setUsers(data.filter(item => item.name !== props.user.name)))
      console.log(users)
  }, [props.user])

  return (
    <div className="usersContainer">
      <h2 className="statusMessage">{statusMessage}</h2>
      {
        users.map((user) => {
          return <User 
            key={user.id} 
            user={user} 
            setStatusMessage={setStatusMessage}
            removeUserFromCurrentView={removeUserFromCurrentView}
          />
        })
      }
    </div>
  )
}

export default Users
