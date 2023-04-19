import React from "react"
import Button from "../components/Button"
import "../styles/User.scss"

function User(props) {
  const updateUsersRole = (id, role) => {
    fetch(`/clients/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
	    method: "PATCH",	
	    body: JSON.stringify({
	      role: role
	    })
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      }
    })
    .then(data => {
      props.setStatusMessage(data.message)

      const timeout = setTimeout(() => {
        props.setStatusMessage("")
      }, 4000)

      return () => clearTimeout(timeout)
    })
  }

  const deleteUser = (id) => {
    fetch(`/clients/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
	    method: "DELETE"
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      }
    })
    .then(data => {
      props.removeUserFromCurrentView(id)
      props.setStatusMessage(data.message)

      const timeout = setTimeout(() => {
        props.setStatusMessage("")
      }, 4000)

      return () => clearTimeout(timeout)
    })
  }

  return (
    <div style={{margin: "5px"}}>
      <span className="name">{props.user.name}</span>
      <span className="roleContainer">
        <span className="role">role:</span>
        <select onChange={(e) => updateUsersRole(props.user.id, e.target.value)} defaultValue={props.user.role}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </span>
      <Button label="Delete" margin="0px" onClick={() => deleteUser(props.user.id)} className="alertButton" />
    </div>
  )
}

export default User
