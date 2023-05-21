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
    fetch(`/clients?name=${props.user.name}`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [props.user])

  return (
    <div className="usersContainer">
      {
        users.length !== 0 &&
          <div>
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
      }
      {
        users.length === 0 &&
          <h2>No users to display</h2>
      }
    </div>
  )
}

export default Users
