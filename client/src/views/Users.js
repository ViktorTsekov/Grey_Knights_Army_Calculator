import React, { useEffect, useState } from "react"
import User from "../components/User"
import InputField from '../components/InputField'
import "../styles/Users.scss"

function Users(props) {
  const [filteredName, setFilteredName] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [users, setUsers] = useState([])

  const removeUserFromCurrentView = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  useEffect(() => {
    fetch(`/api/clients?name=${props.user.name}`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [props.user, filteredName])

  return (
    <div className="usersContainer">
      {
        users.length !== 0 &&
          <div>
            <h2 className="statusMessage">{statusMessage}</h2>
            <InputField margin="0px 0px 35px 5px" labelInline="left" name="filteredName" label="Search by name" type="text" isRequired={false} onChange={(val) => setFilteredName(val)} value={filteredName} />
            {
              users.filter((user) => (user.name.startsWith(filteredName) || filteredName === ""))
              .map((user) => {
                return( <User 
                  key={user.id} 
                  user={user} 
                  setStatusMessage={setStatusMessage}
                  removeUserFromCurrentView={removeUserFromCurrentView}
                />)
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
